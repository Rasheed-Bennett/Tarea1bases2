USE AdventureWorks2022;


GO
CREATE PROCEDURE Production.JGetProductCategoryByID
@ProductID INT
AS
BEGIN
    SET NOCOUNT ON;
    SELECT   p.Name AS ProductName,
             ps.Name AS ProductCategoryName
    FROM     Production.Product AS p
             INNER JOIN
             Production.ProductSubcategory AS ps
             ON p.ProductSubcategoryID = ps.ProductSubcategoryID
             INNER JOIN
             Production.ProductCategory AS pc
             ON ps.ProductCategoryID = pc.ProductCategoryID
    GROUP BY p.Name, ps.Name
    HAVING   p.ProductID = @ProductID;
END


GO
CREATE PROCEDURE Production.JGetProductCategoryByName
@ProductName NVARCHAR (50)
AS
BEGIN
    SET NOCOUNT ON;
    SELECT   p.Name AS ProductName
    FROM     Production.Product AS p
             INNER JOIN
             Production.ProductSubcategory AS ps
             ON p.ProductSubcategoryID = ps.ProductSubcategoryID
             INNER JOIN
             Production.ProductCategory AS pc
             ON ps.ProductCategoryID = pc.ProductCategoryID
    GROUP BY p.Name, ps.Name
    HAVING   p.Name LIKE '%' + @ProductName + '%';
END


GO
CREATE PROCEDURE Production.JUpdateProductCategoryByID
@ProductID INT, @ProductCategoryID INT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE Production.ProductSubcategory
    SET    ProductCategoryID = @ProductCategoryID
    WHERE  ProductSubcategoryID = (SELECT ProductSubcategoryID
                                   FROM   Production.Product AS p
                                   WHERE  p.ProductID = @ProductID);
END


GO
CREATE PROCEDURE Production.JDeleteProductReviewByID
@ProductID INT, @ReviewID INT
AS
BEGIN
    SET NOCOUNT ON;
    DELETE Production.ProductReview
    WHERE  ProductID = @ProductID
           AND ProductReviewID = @ReviewID;
END