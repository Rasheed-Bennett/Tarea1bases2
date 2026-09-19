USE AdventureWorks2022;


GO
CREATE PROCEDURE Production.GetProductByID
@ProductID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM   Production.Product AS p
    WHERE  p.ProductID = @ProductID;
END


GO
CREATE PROCEDURE Production.GetProductByName
@ProductName NVARCHAR (50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM   Production.Product AS p
    WHERE  p.Name LIKE '%' + @ProductName + '%';
END


GO
CREATE PROCEDURE Production.DeleteProductByID
@ProductID INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE Production.Product
    WHERE  ProductID = @ProductID;
END


GO
CREATE PROCEDURE Production.UpdateProductByID
@Name NVARCHAR (50), @ProductNumber NVARCHAR (25), @Color NVARCHAR (15), @StandardCost MONEY, @ListPrice MONEY, @Size NVARCHAR (5), @Weight DECIMAL (8, 2), @ProductCategoryID INT, @ProductModelID INT, @SellStartDate DATETIME, @SellEndDate DATETIME, @DiscontinuedDate DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Production.Product
    SET    Name              = @Name,
           ProductNumber     = @ProductNumber,
           Color             = @Color,
           StandardCost      = @StandardCost,
           ListPrice         = @ListPrice,
           Size              = @Size,
           Weight            = @Weight,
           ProductCategoryID = @ProductCategoryID,
           ProductModelID    = @ProductModelID,
           SellStartDate     = @SellStartDate,
           SellEndDate       = @SellEndDate,
           DiscontinuedDate  = @DiscontinuedDate
    WHERE  ProductID = @ProductID;
END


GO
CREATE PROCEDURE Production.InsertProduct
@Name NVARCHAR (50), @ProductNumber NVARCHAR (25), @Color NVARCHAR (15), @StandardCost MONEY, @ListPrice MONEY, @Size NVARCHAR (5), @Weight DECIMAL (8, 2), @ProductCategoryID INT, @ProductModelID INT, @SellStartDate DATETIME, @SellEndDate DATETIME, @DiscontinuedDate DATETIME
AS
BEGIN
    SET NOCOUNT ON;
    INSERT  INTO Production.Product (
        Name,
        ProductNumber,
        Color,
        StandardCost,
        ListPrice,
        Size,
        Weight,
        ProductCategoryID,
        ProductModelID,
        SellStartDate,
        SellEndDate,
        DiscontinuedDate
    )
    VALUES                         (@Name, @ProductNumber, @Color, @StandardCost, @ListPrice, @Size, @Weight, @ProductCategoryID, @ProductModelID, @SellStartDate, @SellEndDate, @DiscontinuedDate);
END


GO
CREATE PROCEDURE Production.GetAllProducts
AS
BEGIN
    SET NOCOUNT ON;
    SELECT *
    FROM   Production.Product;
END