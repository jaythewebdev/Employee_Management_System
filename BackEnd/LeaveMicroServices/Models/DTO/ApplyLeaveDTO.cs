namespace EmployeeManagement.Models.DTO
{
    public class ApplyLeaveDTO
    {
        public int LeaveId { get; set; }
        public int EmpId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NoOfDays { get; set; }
        public string? Reasons { get; set; }
    }
}
