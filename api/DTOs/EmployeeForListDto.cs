using System;

namespace api.DTOs
{
    public class EmployeeForListDto
    {
        public int Eid { get; set; }
        public string Username { get; set; } 
        public string Efirstname { get; set; }
        public string Elastname { get; set; }
        public int Eage { get; set; }
        public string Egender { get; set; }
        public int Age { get; set; }
        public DateTime Edateofbirth { get; set; }
        public string Eemail { get; set; }
        public string Elanguages { get; set; }
        public string Eskills { get; set; }
        public string Ereligion { get; set; }
        public string Enationality { get; set; }
        public string Ecaste { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string PhotoUrl { get; set; }

    }
}