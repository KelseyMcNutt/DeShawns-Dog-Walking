namespace Models.DTOs;
public class DogsDTO {
    public int Id {get; set;}
    public string Name {get; set;}
    public int WalkerId {get; set;}
    public WalkersDTO Walker {get; set;}
    public int CityId{get; set;}
}