import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { Role } from "./entities/roles.enum";
import { User } from "./entities/user.entity";


@Injectable()
export class RolesGaurd implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean{
       //what is the required role??? we'd need to extract that out
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[
            //In the context that i am, what class is it happening(what class should i check)
            context.getClass(),
            //In the context that i am, what method in that class will i check 
            context.getHandler(),
        ])
        
        if(!requiredRoles){
            return true
        }

        // const {user} = context.switchToHttp().getRequest()
        const user:User = {
            name:"Omotosho Joseph",
            roles:[Role.USER]
        }

       //is the current user making a request with that role??
        return requiredRoles.some(role => user.roles.includes(role))

        
    }
}