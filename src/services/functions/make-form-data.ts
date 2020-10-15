declare type MakeFormDataType = (obj: any) => FormData;

export const makeFormData: MakeFormDataType = (obj: any) => {
    var formData = new FormData()
    for (let key in obj) {
        formData.append(key, obj[key]);
    }
    return formData;
}