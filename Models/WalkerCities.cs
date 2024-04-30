using Models.DTOs;

namespace Models;
public class WalkerCities {
    public int Id {get; set;}
    public int WalkerId {get; set;}
    public WalkersDTO? Walker {get; set;}
    public int CityId {get; set;}
    public CitiesDTO? City {get; set;}
}
