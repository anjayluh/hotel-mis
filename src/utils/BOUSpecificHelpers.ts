import { PaymentTypeOptions } from "../data/comboCategories";
import { resourceGroups } from "../data/constants";

//Prints the human readable name of a payment type and not the machine name
export const formatPaymentType = (type: string) => {
    return PaymentTypeOptions
            .filter(item => item.value === type)
            .map(item => item.label )
            .toString();
};

export interface IRole {  
    role: string | string[] 
}
export const checkUserRole = (role: IRole, resource: string) => {
    let resourceExists = false
    if(Array.isArray(role)) {
        resourceExists = checkRoleArray(role,resource)
    } else {
        resourceExists = checkRoleString(`${role}`, resource)
    }
    return resourceExists
}
const checkRoleString = (role: string, resource: string) => {
    const roleItem = role.toLowerCase();
    if(resourceGroups[roleItem] && resourceGroups[roleItem].includes(resource)) 
        return true;
    return false;
}
const checkRoleArray =(role: string[], resource:string) => {
    for(let i=0; i< role.length; i++) {
        const roleItem = role[i].toLowerCase()
        if(resourceGroups[roleItem] && resourceGroups[roleItem].includes(resource)) {
            return true;
        } 
    }
    return false;
}

export const checkRoleAvailability = (role: IRole, availableRoles: string[]) => {
    let resourceExists = false
    if(Array.isArray(role)) {
        resourceExists = role.some((role: any) => availableRoles.includes(role.toLowerCase()))
    } else {
        resourceExists = availableRoles.includes(`${role}`.toLowerCase())
    }
    return resourceExists
} 