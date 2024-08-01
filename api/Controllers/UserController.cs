using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.DTO;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UserService _data;

        public UserController(UserService dataFromService)
        {
            _data = dataFromService;
        }

        //Add user

        [HttpPost("AddUsername")]

        public bool AddUser(CreateAccountDTO UserToAdd)
        {

        return _data.AddUser(UserToAdd);

        }

        //Login
        //Update user account
        //Delete User accounr
    }
}