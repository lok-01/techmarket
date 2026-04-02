import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Createcontext';

const AdminDashboard = () => {
    const { user, token, isAdmin, API_URL } = useContext(UserContext);
    const navigate = useNavigate();

    // Redirect if not admin
    useEffect(() => {
        if (!isAdmin) {
            navigate("/login");
        }
    }, [isAdmin, navigate]);

    // Active tab
    const [activeTab, setActiveTab] = useState("products");

    // Products state
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);

    // Users state
    const [users, setUsers] = useState([]);
    const [usersLoading, setUsersLoading] = useState(false);

    // Product form state
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productForm, setProductForm] = useState({
        name: '', brand: '', price: '', image: '',
        bestSeller: false, discount: '', rating: '', reviews: ''
    });

    // Messages
    const [message, setMessage] = useState({ text: '', type: '' });

    // Fetch products
    const fetchProducts = async () => {
        setProductsLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/products`);
            const data = await res.json();
            if (data.success) {
                setProducts(data.data);
            }
        } catch (err) {
            console.log("Error fetching products:", err);
        }
        setProductsLoading(false);
    };

    // Fetch users (admin only)
    const fetchUsers = async () => {
        setUsersLoading(true);
        try {
            const res = await fetch(`${API_URL}/api/auth/users`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
            }
        } catch (err) {
            console.log("Error fetching users:", err);
        }
        setUsersLoading(false);
    };

    useEffect(() => {
        if (isAdmin) {
            fetchProducts();
            fetchUsers();
        }
    }, [isAdmin]);

    // Show message helper
    const showMessage = (text, type = 'success') => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: '', type: '' }), 3000);
    };

    // Reset product form
    const resetForm = () => {
        setProductForm({
            name: '', brand: '', price: '', image: '',
            bestSeller: false, discount: '', rating: '', reviews: ''
        });
        setEditingProduct(null);
        setShowProductForm(false);
    };

    // Handle product form submit (create or update)
    const handleProductSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: productForm.name,
            brand: productForm.brand,
            price: Number(productForm.price),
            image: productForm.image,
            bestSeller: productForm.bestSeller,
            discount: Number(productForm.discount) || 0,
            rating: Number(productForm.rating) || 0,
            reviews: Number(productForm.reviews) || 0
        };

        try {
            let res;
            if (editingProduct) {
                // Update
                res = await fetch(`${API_URL}/api/products/${editingProduct._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                // Create
                res = await fetch(`${API_URL}/api/products`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    body: JSON.stringify(payload)
                });
            }

            const data = await res.json();
            if (data.success) {
                showMessage(editingProduct ? "Product updated! ✅" : "Product created! ✅");
                resetForm();
                fetchProducts();
            } else {
                showMessage(data.message, 'error');
            }
        } catch (err) {
            showMessage("Network error", 'error');
        }
    };

    // Delete product
    const handleDeleteProduct = async (id) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;

        try {
            const res = await fetch(`${API_URL}/api/products/${id}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                showMessage("Product deleted! 🗑️");
                fetchProducts();
            } else {
                showMessage(data.message, 'error');
            }
        } catch (err) {
            showMessage("Network error", 'error');
        }
    };

    // Edit product — populate form
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            brand: product.brand,
            price: product.price,
            image: product.image,
            bestSeller: product.bestSeller || false,
            discount: product.discount || '',
            rating: product.rating || '',
            reviews: product.reviews || ''
        });
        setShowProductForm(true);
    };

    if (!isAdmin) return null;

    return (
        <div className="admin-dashboard">
            {/* Header */}
            <div className="admin-header">
                <div className="admin-header-left">
                    <h1>⚙️ Admin Dashboard</h1>
                    <p>Welcome back, <strong>{user?.username}</strong></p>
                </div>
                <div className="admin-stats">
                    <div className="stat-card">
                        <span className="stat-number">{products.length}</span>
                        <span className="stat-label">Products</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-number">{users.length}</span>
                        <span className="stat-label">Users</span>
                    </div>
                </div>
            </div>

            {/* Message toast */}
            {message.text && (
                <div className={`admin-toast ${message.type}`}>
                    {message.text}
                </div>
            )}

            {/* Tabs */}
            <div className="admin-tabs">
                <button
                    className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
                    onClick={() => setActiveTab("products")}
                >
                    📦 Products
                </button>
                <button
                    className={`admin-tab ${activeTab === "users" ? "active" : ""}`}
                    onClick={() => setActiveTab("users")}
                >
                    👥 Users
                </button>
            </div>

            {/* ═══════════════════════════ */}
            {/* PRODUCTS TAB               */}
            {/* ═══════════════════════════ */}
            {activeTab === "products" && (
                <div className="admin-section">
                    <div className="section-header">
                        <h2>Product Management</h2>
                        <button
                            className="admin-add-btn"
                            onClick={() => {
                                resetForm();
                                setShowProductForm(!showProductForm);
                            }}
                        >
                            {showProductForm ? "✕ Cancel" : "＋ Add Product"}
                        </button>
                    </div>

                    {/* Product Form */}
                    {showProductForm && (
                        <div className="admin-form-card">
                            <h3>{editingProduct ? "✏️ Edit Product" : "📦 New Product"}</h3>
                            <form onSubmit={handleProductSubmit} className="admin-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Product Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. MacBook Pro"
                                            value={productForm.name}
                                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Brand</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Apple"
                                            value={productForm.brand}
                                            onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Price (₹)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 2499"
                                            value={productForm.price}
                                            onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input
                                            type="text"
                                            placeholder="https://..."
                                            value={productForm.image}
                                            onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Discount (%)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 10"
                                            value={productForm.discount}
                                            onChange={(e) => setProductForm({ ...productForm, discount: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Rating (0-5)</label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            min="0"
                                            max="5"
                                            placeholder="e.g. 4.5"
                                            value={productForm.rating}
                                            onChange={(e) => setProductForm({ ...productForm, rating: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Reviews</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 500"
                                            value={productForm.reviews}
                                            onChange={(e) => setProductForm({ ...productForm, reviews: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <label className="checkbox-wrapper">
                                        <input
                                            type="checkbox"
                                            checked={productForm.bestSeller}
                                            onChange={(e) => setProductForm({ ...productForm, bestSeller: e.target.checked })}
                                        />
                                        <span>Best Seller</span>
                                    </label>
                                </div>

                                <button type="submit" className="admin-submit-btn">
                                    {editingProduct ? "💾 Update Product" : "📦 Create Product"}
                                </button>
                            </form>
                        </div>
                    )}

                    {/* Products Table */}
                    {productsLoading ? (
                        <div className="admin-loading">Loading products...</div>
                    ) : (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Brand</th>
                                        <th>Price</th>
                                        <th>Rating</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product._id}>
                                            <td>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="admin-product-img"
                                                />
                                            </td>
                                            <td>
                                                <div className="admin-product-name">{product.name}</div>
                                                {product.bestSeller && <span className="admin-badge bestseller">Best Seller</span>}
                                            </td>
                                            <td>{product.brand}</td>
                                            <td className="admin-price">₹{product.price?.toLocaleString()}</td>
                                            <td>⭐ {product.rating}</td>
                                            <td>
                                                <div className="admin-actions">
                                                    <button
                                                        className="admin-edit-btn"
                                                        onClick={() => handleEditProduct(product)}
                                                    >
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        className="admin-delete-btn"
                                                        onClick={() => handleDeleteProduct(product._id)}
                                                    >
                                                        🗑️ Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {products.length === 0 && (
                                <div className="admin-empty">No products found. Add your first product!</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* ═══════════════════════════ */}
            {/* USERS TAB                  */}
            {/* ═══════════════════════════ */}
            {activeTab === "users" && (
                <div className="admin-section">
                    <div className="section-header">
                        <h2>All Users</h2>
                        <button className="admin-add-btn" onClick={fetchUsers}>
                            🔄 Refresh
                        </button>
                    </div>

                    {usersLoading ? (
                        <div className="admin-loading">Loading users...</div>
                    ) : (
                        <div className="admin-table-wrapper">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                        <th>Joined</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u._id}>
                                            <td>
                                                <div className="admin-user-info">
                                                    <span className="admin-user-avatar">
                                                        {u.username?.charAt(0).toUpperCase()}
                                                    </span>
                                                    {u.username}
                                                </div>
                                            </td>
                                            <td>{u.email}</td>
                                            <td>
                                                <span className={`admin-badge ${u.role}`}>
                                                    {u.role === "admin" ? "👑 Admin" : "👤 User"}
                                                </span>
                                            </td>
                                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {users.length === 0 && (
                                <div className="admin-empty">No users found.</div>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
