using System.ComponentModel.DataAnnotations;

namespace EmployeeManagement.Models
{
    public class Leave
    {
        [Key]
        public int LeaveId { get; set; }
        public int  EmpId { get; set; }
        public int ManagerId { get; set; }

        [Required(ErrorMessage ="Date cannot be empty")]
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int NoOfDays { get; set; }

        [Required(ErrorMessage ="Reason should be filled")]
        public string? Reason { get; set; }
        public bool? ApprovalStatus { get; set; }
        public DateTime? ApprovedDate { get; set; }
    }

}
