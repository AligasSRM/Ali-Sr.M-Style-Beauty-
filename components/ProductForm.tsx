export function ProductForm() {
  return (
    <form className="panel product-form">
      <h3>Create Product</h3>
      <label>
        Name
        <input type="text" name="name" placeholder="Product name" />
      </label>
      <label>
        Price
        <input type="number" name="price" placeholder="129" />
      </label>
      <label>
        Category
        <input type="text" name="category" placeholder="Fashion" />
      </label>
      <button type="submit" className="primary-button">Save</button>
    </form>
  );
}
