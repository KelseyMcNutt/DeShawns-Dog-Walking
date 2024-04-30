namespace Models.DTOs;
public class WalkerCitiesDTO {
    public int Id {get; set;}
    public int WalkerId {get; set;}
    public WalkersDTO? Walker {get; set;}
    public int CityId {get; set;}
    public CitiesDTO? City {get; set;}
}