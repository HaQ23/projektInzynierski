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
export interface ReservationDto {
  id: number;
  reservationDate: Date;
  reservationTime: string;
  employeeOfferId: number;
  duration: number;
  status: string;
}
export interface UnavailableDayDto {
  id: number;
  date: Date;
  reason: string;
  recurring: boolean;
}
export interface EmployeeScheduleRequest {
  employeeId: number;
  date: Date;
  serviceDurationMinutes: number;
}
export interface TimeSlotDto {
  time: string;
}
export interface ReservationRequest {
  reservationDate: string;
  reservationTime: string;
  employeeOfferId: number;
}
export interface ReservationDto {
  id: number;
  reservationDate: Date;
  reservationTime: string;
  employeeFirstName: string;
  employeeLastName: string;
  offerName: string;
  price: number;
  userId: string;
  status: string;
}
export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
export interface MessageResponse {
  message: string;
}
export interface UpdateUserRequest {
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
}
export interface UserInfoResponse {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  address: string;
  role: string;
}
export interface ReservationDetailsDto {
  id: number;
  reservationDate: Date;
  reservationTime: string;
  offerName: string;
  price: number;
  status: string;
  employeeOfferId: number;
  employeeId: number;
  employeeFirstName: string;
  employeeLastName: string;
  duration: number;
  userId: string;
  userFirstName: string;
  userLastName: string;
  serviceId: number;
}
export interface UserDetailsDto {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  enabled: boolean;
  addres: string;
  reservationCount: number;
}
export interface OfferRequest {
  title: string;
  description: string;
}
export interface EmployeeDetailsRequest {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface EmployeeDetailsDto extends EmployeeDetailsRequest {
  id: number;
}
export interface EmployeeOfferRequest {
  employeeId: number;
  offerId: number;
  price: number;
  time: string;
}

export interface EmployeeOfferDetailsDto {
  id: number;
  employeeId: number;
  offerId: number;
  title: string;
  description: string;
  price: number;
  time: string;
  serviceName: string;
}

export interface EmployeeOfferDto extends EmployeeOfferRequest {
  id: number;
}
