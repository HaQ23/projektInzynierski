export interface EmployeeOfferDto {
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
  employeeOfferList: EmployeeOfferDto[];
}
