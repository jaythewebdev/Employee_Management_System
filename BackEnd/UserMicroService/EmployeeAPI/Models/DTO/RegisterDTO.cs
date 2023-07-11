namespace EmployeeAPI.Models.DTO
{
    public class RegisterDTO:Employee
    {
        //We are using Password Clear in DTO Because We cant Store it in Db
        //Directly
        public string? PasswordClear { get; set; }
    }
}
