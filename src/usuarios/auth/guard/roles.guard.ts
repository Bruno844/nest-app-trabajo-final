import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { RoleStatusList } from "../enum/role.enum";
import { ROLES_KEY } from "../decorators/roles.decorator";




@Injectable()
export class RolesGuard implements CanActivate{

    //*El Reflector te permitirá leer los metadatos adjuntados a los controladores o controladores de métodos en tiempo de ejecución.
    constructor(private reflector: Reflector){}


    //*La función getAllAndOverride del Reflector se utiliza para obtener los metadatos de un controlador o controlador de método, pero con la capacidad de sobrescribir esos metadatos si existen en varios niveles de la jerarquía
    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<RoleStatusList>(ROLES_KEY,[
            //* da como resultado la extracción de los metadatos para el controlador de ruta procesado actualmente.
            context.getHandler(),
            //*metadatos del controlador de clase
            context.getClass()
        ])

        if(!requiredRoles){
            return true;
        }

        const {user} = context.switchToHttp().getRequest();
        return user.role === requiredRoles

    }

}