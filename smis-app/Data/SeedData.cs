using Microsoft.AspNetCore.Identity;
using SchoolManagmentSystem.Models;

namespace SchoolManagmentSystem.Data
{
    public class SeedData
    {
        public static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
        {
            if (!await roleManager.RoleExistsAsync("Super Admin"))
            {
                await roleManager.CreateAsync(new IdentityRole("Super Admin"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            if (!await roleManager.RoleExistsAsync("User"))
            {
                await roleManager.CreateAsync(new IdentityRole("User"));
            }

            if (!await roleManager.RoleExistsAsync("Professor"))
            {
                await roleManager.CreateAsync(new IdentityRole("Professor"));
            }

            if (!await roleManager.RoleExistsAsync("Student"))
            {
                await roleManager.CreateAsync(new IdentityRole("Student"));
            }

            if (!await roleManager.RoleExistsAsync("Assistant"))
            {
                await roleManager.CreateAsync(new IdentityRole("Assistant"));
            }

            if (!await roleManager.RoleExistsAsync("Academic Staff"))
            {
                await roleManager.CreateAsync(new IdentityRole("Academic Staff"));
            }
        }

        public static async Task SeedUsersAsync(UserManager<ApplicationUser> userManager)
        {
            if (await userManager.FindByEmailAsync("admin@gmail.com") == null)
            {
                var adminUser = new ApplicationUser
                {
                    FirstName = "Admin",
                    LastName = "Admin",
                    UserName = "admin@gmail.com",
                    Email = "admin@gmail.com",
                };

                var result = await userManager.CreateAsync(adminUser, "Admin.123");

                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(adminUser, "Super Admin");
                }
            }
        }
    }
}
