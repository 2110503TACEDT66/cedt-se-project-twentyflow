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
    rooms : Room[],
}
interface CoworkingJson {
    success: boolean,
    count: number,
    
    pagination: Object,
    data: Coworking[]
}

interface Room {
    roomNumber: number,
    capacity: number,
    _id: string,

}

interface User {
    name: string,
    _id: string,
    tel: string,
}

interface Reservation {
    startTime : string,
    endTime : string,
    date : string,
    user : User,
    coWorking : Coworking,
    createAt : string,
    priceId : string,
    status : string,
    room : Room,
    additional : string,
    _id : string
}

interface ReservationJson {
    startTime : string,
    endTime : string,
    date : string,
    user : User,
    coWorking : Coworking,
    createAt : string,
    priceId : string,
    status : string,
    room : string,
    additional : string,
    _id : string
}


interface Reward {
    rewardName : string,
    rewardPoint : number,
    _id : string
    
}

interface History {
    _id: string;
    coWorking: Coworking;
    price: number;
    user : User;
    appointment : Reservation;
    hour : number;
    
}

interface StatCardProps {
    icon: string;
    changePercentage: string;
    changeDirection: "up" | "down";
    value: string;
    label: string;
  }

interface HistoryDetails {
    _id: string;
    user: Object;
    coWorking: Object;
    appointment: string;
    hour: number;
    price: number;
}

interface RankItemPriceProps {
    rank: number;
    name: string;
    price: string;
}

interface RankItemHourProps {
    rank: number;
    name: string;
    hour: string;
}

interface UserSortByPrice {
    _id: string;
    name: string;
    points: string;
}

interface UserSortByHour {
    totalHours: number;
    user: string;
    userId: string;
}