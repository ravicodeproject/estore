using System;

namespace api.Models
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; }
        public Employee Employee { get; set; }
        public int EmployeeEid { get; set; }
    }
}