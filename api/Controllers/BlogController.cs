using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {

        private readonly BlogItemService _data;

        public BlogController(BlogItemService dataFromService)
        {
            _data = dataFromService;
        }

        [HttpPost("AddBlogItems")]

        public bool AddBlogItems(BlogItemModel newBlogItem)
        {
            return _data.AddBlogItems(newBlogItem);
        }

        //GetBlogItem
        [HttpGet("GetBlogItem")]
        public IEnumerable<BlogItemModel> GetAllBlogItems()
        {
            return _data.GetAllBlogItems();
        }

        //GetBlogItemsByCategory
        [HttpGet("GetBlogItemByCategory/{Category}")]
        public IEnumerable<BlogItemModel> GetItemByCategory(string Category)
        {
            return _data.GetItemByCategory(Category);
        }

        // GetItemsByTags
        [HttpGet("GetItemsByTags/{Tag}")]
        public List<BlogItemModel> GetItemByTag(string Tag)
        {
            return _data.GetItemByTag(Tag);
        }

        // GetBlogItemsByDate
        [HttpGet("GetItemsByDate/{Date}")]
        public IEnumerable<BlogItemModel> GetItemsByDate(string Date){
            return _data.GetItemsByDate(Date);
        }

        //UpdateBlogItems 
        [HttpPost("UpdateBlogItem")]
        public bool UpdateBlogItems(BlogItemModel BlogUpdate)
        {
            return _data.UpdateBlogItems(BlogUpdate);
        }

        //DeleteBlogItem
        [HttpPost("DeleteBlogItem/{BlogItemToDelete}")]
        public bool DeleteBlogItem(BlogItemModel BlogDelete)
        {
            return _data.DeleteBlogItem(BlogDelete);
        }

         //GetPublishedBlogItems
        [HttpGet("GetPublishedItems")]
        public IEnumerable<BlogItemModel> GetPublishedItem()
        {
            return _data.GetPublishedItems();
        }
    }
}