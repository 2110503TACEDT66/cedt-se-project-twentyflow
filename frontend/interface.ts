interface Coworking {
    id : string,
    name: string,
    address : string,
    district: string,
    province: string,
    postalcode: string,
    tel : string,
    price_hourly : number,
    opentime : string,
    closetime : string,
}
interface CoworkingJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: Coworking[]
}

interface User {
    name: string,
    _id: string,

}

interface Reservation {
    startTime : string,
    endTime : string,
    user : User,
    coWorking : Coworking,
    createAt : string,
    _id : string
}