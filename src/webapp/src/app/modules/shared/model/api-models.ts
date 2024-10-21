export interface OfferDto {
  id: number;
  price: number;
  title: string;
  description: string;
  time: string;
}
export interface EmployeeDto {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: number;
  employeeOfferList: OfferDto[];
}
export interface EmployeeScheduleDto {
  id: number;
  EmployeeId: number;
  date: Date;
  unabaliableFrom: string;
  time: number;
}
