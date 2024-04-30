using Models;
using Models.DTOs;

List<Dogs> dogs = new List<Dogs> 
{
    new Dogs { Id = 1, Name = "Bree", WalkerId = 1, CityId = 1},
    new Dogs { Id = 2, Name = "Belle", WalkerId = 2, CityId = 2},
    new Dogs { Id = 3, Name = "Bailey", WalkerId = 2, CityId = 2},
    new Dogs { Id = 4, Name = "Biscuit", WalkerId = 1, CityId = 1}
};
List<Cities> cities = new List<Cities>
{
    new Cities { Id = 1, City = "Nashville"},
    new Cities { Id = 2, City = "Franklin"}
};
List<Walkers> walkers = new List<Walkers> 
{
    new Walkers { Id = 1, Name = "Cynthia"},
    new Walkers { Id = 2, Name = "Kelsey"}
};
List<WalkerCities> walkerCities = new List<WalkerCities>
{
    new WalkerCities { Id = 1, WalkerId = 1, CityId = 1},
    new WalkerCities { Id = 2, WalkerId = 2, CityId = 2}
};


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("/api/hello", () =>
{
    return new { Message = "Welcome to DeShawn's Dog Walking" };
});

app.MapGet("/api/dogs", () =>
{
    return dogs.Select( d => new DogsDTO 
    {
        Id = d.Id,
        Name = d.Name,
        WalkerId = d.WalkerId,
        CityId = d.CityId
    });
        
    
});

app.MapGet("api/cities", () =>
{
    return cities.Select( c => new CitiesDTO
    {
        Id = c.Id,
        City =  c.City
    });
});

app.MapGet("/api/walkers", () =>
{
    return walkers.Select( w => new WalkersDTO
    {
        Id = w.Id,
        Name = w.Name
    });
});

app.MapGet("/api/filteredWalkers/{cityId}", (int cityId) => 
{
    List<WalkerCities> walkercitylist = walkerCities.Where(w => w.CityId == cityId).ToList();

    return Results.Ok(walkercitylist.Select(wc => 
    {
        Cities city = cities.FirstOrDefault(c => c.Id == wc.CityId);
        Walkers walker = walkers.FirstOrDefault(w => w.Id == wc.WalkerId);
        return new WalkerCitiesDTO
        {
            Id = wc.Id,
            CityId = wc.CityId,
            City = city != null ? new CitiesDTO 
            {
                Id = city.Id,
                City = city.City
            } : null,
            WalkerId = wc.WalkerId,
            Walker = walker != null ? new WalkersDTO
            {
                Id = walker.Id,
                Name = walker.Name
            } : null
        };
    }).ToList());
});




app.MapGet("/api/dogdetails", (int id) =>
{
    Dogs dog = dogs.FirstOrDefault(d => d.Id == id);
    
    if (dog == null)
    {
        return Results.NotFound();
    }

    Walkers walker = walkers.FirstOrDefault(w => w.Id == dog.WalkerId);

    DogsDTO dogDTO = new DogsDTO
    {
        Id = dog.Id,
        Name = dog.Name,
        WalkerId = dog.WalkerId,
        CityId = dog.CityId
    };

    if (walker != null)
    {
        dogDTO.Walker = new WalkersDTO
        {
            Id = walker.Id,
            Name = walker.Name
        };
    }
    else
    {
        dogDTO.Walker = new WalkersDTO
        {
            Id = -1, // Or any default ID for no walker
            Name = "No Walker Assigned"
        };
    }

    return Results.Ok(dogDTO);
});



app.MapPost("/api/addDog", (Dogs incomingDog) =>
{
    incomingDog.Id = dogs.Count() + 1;
    dogs.Add(incomingDog);
    return Results.Created($"/api/dogs/{incomingDog.Id}", new DogsDTO
    {
        Id = incomingDog.Id,
        Name = incomingDog.Name,
        WalkerId = incomingDog.WalkerId,
        CityId = incomingDog.CityId,
    });
});



app.Run();
