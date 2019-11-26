using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace api.Migrations
{
    public partial class initialcreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Eid = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Username = table.Column<string>(nullable: true),
                    PasswordHash = table.Column<byte[]>(nullable: true),
                    PasswordSalt = table.Column<byte[]>(nullable: true),
                    Efirstname = table.Column<string>(nullable: true),
                    Elastname = table.Column<string>(nullable: true),
                    Eage = table.Column<int>(nullable: false),
                    Egender = table.Column<string>(nullable: true),
                    Edateofbirth = table.Column<DateTime>(nullable: false),
                    Eemail = table.Column<string>(nullable: true),
                    Elanguages = table.Column<string>(nullable: true),
                    Eskills = table.Column<string>(nullable: true),
                    Ereligion = table.Column<string>(nullable: true),
                    Enationality = table.Column<string>(nullable: true),
                    Ecaste = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Eid);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
