using Models.DTOs;

namespace Models;
public class Dogs {
    public int Id {get; set;}
    public string Name {get; set;}
    public int WalkerId {get; set;}
    public WalkersDTO Walker {get; set;}
    public int CityId{get; set;}
}