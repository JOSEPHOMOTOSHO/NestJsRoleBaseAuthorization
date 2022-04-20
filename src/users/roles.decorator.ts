import {SetMetadata} from "@nestjs/common"
import { Role } from "./entities/roles.enum"

//metod that takes in a string array of roles and sets the metadata to those roles provided in
//the argument
export const Roles = (...roles:Role[]) => SetMetadata('roles', roles)