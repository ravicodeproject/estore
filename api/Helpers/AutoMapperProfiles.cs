using System.Linq;
using api.DTOs;
using api.Models;
using AutoMapper;

namespace api.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Employee, EmployeeForListDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt =>
            opt.MapFrom(src => src.Edateofbirth.CaluclateAge()));

            CreateMap<Employee, EmployeeForDetailedDto>()
            .ForMember(dest => dest.PhotoUrl, opt =>
            opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url))
            .ForMember(dest => dest.Age, opt =>
            opt.MapFrom(src => src.Edateofbirth.CaluclateAge()));

            CreateMap<Photo, PhotoForDetailedDto>();
            CreateMap<EmployeeForUpdateDto, Employee>();
            CreateMap<EmployeeForRegisterDto, Employee>();
        }
    }
}