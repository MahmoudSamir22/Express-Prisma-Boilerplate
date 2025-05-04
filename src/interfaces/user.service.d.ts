import { UpdateProfile, UserProfile } from "../types/userType";

export default interface IUserService {
    getProfile(user_id: number): Promise<UserProfile>
    updateProfile(user_id: number, data: UpdateProfile): Promise<UserProfile>
}