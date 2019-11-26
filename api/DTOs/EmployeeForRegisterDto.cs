using System;
using System.ComponentModel.DataAnnotations;

namespace api.DTOs
{
    public class EmployeeForRegisterDto
    {
        [Required]
        public string Username { get; set; }    
        [Required]
        [StringLength(8,MinimumLength=4,ErrorMessage="You must specify password between 4 and 8 characters.")]
        public string password { get; set; }  
        [Required]
        public string Efirstname { get; set; }
        [Required]
        public string Elastname { get; set; }
        //public int Eage { get; set; }
        [Required]
        public string Egender { get; set; }
        [Required]
        public DateTime Edateofbirth { get; set; }
        [Required]
        public string Eemail { get; set; }
        //public string Elanguages { get; set; }
        //public string Eskills { get; set; }
        //public string Ereligion { get; set; }
        [Required]
        public string Enationality { get; set; }
        //public string Ecaste { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public EmployeeForRegisterDto()
        {
            this.Created = DateTime.Now;
            this.LastActive = DateTime.Now;
        }
    }
}