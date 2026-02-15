import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Reflector} from "@nestjs/core";
import { Observable } from "rxjs";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
        if(!requiredRoles){
            return true; // no roles required -> allow
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user; // comes from your AuthGuard attaching payload

        if (!user || !requiredRoles.includes(user.role)) {
             throw new ForbiddenException('You do not have permission to access this resource'); 
        }

        return true;
        
    }
}