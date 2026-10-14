import React, { useEffect, useRef, useState } from "react";
import {
  X,
  LayoutDashboard,
  Package,
  CheckCircle2,
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
  ShieldCheck,
  Upload,
  Image as ImageIcon,
} from "lucide-react";
import { CATEGORIES, formatPrice } from "../data/products";

/* =========================================================
   ADMIN — Store management dashboard
   Login gate → Overview tab → Products tab (CRUD).
   Image is now uploaded from the local device.
========================================================= */

export default function Admin({
  open,
  onClose,
  authenticated,
  onLogin,
  password,
  onPasswordChange,
  products,
  editingProduct,
  onStartEditing,
  onCancelEditing,
  onSaveProduct,
  onAddProduct,
  onDeleteProduct,
}) {
  const [tab, setTab] = useState("overview");
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");

  const [draft, setDraft] = useState({
    name: "",
    category: "Men",
    subcategory: "",
    price: "",
    oldPrice: "",
    stock: "",
    image: "",
    description: "",
  });

  const fileInputRef = useRef(null);

  /* Sync draft with editing product */
  useEffect(() => {
    if (editingProduct) {
      setDraft({
        name: editingProduct.name || "",
        category: editingProduct.category || "Men",
        subcategory: editingProduct.subcategory || "",
        price: editingProduct.price ?? "",
        oldPrice: editingProduct.oldPrice ?? "",
        stock: editingProduct.stock ?? "",
        image: editingProduct.image || "",
        description: editingProduct.description || "",
      });
      setTab("products");
    }
  }, [editingProduct]);

  if (!open) return null;

  const filteredProducts = products.filter((product) => {
    const q = search.toLowerCase();
    return (
      product.name?.toLowerCase().includes(q) ||
      product.category?.toLowerCase().includes(q)
    );
  });

  function updateDraft(field, value) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function resetDraft() {
    setDraft({
      name: "",
      category: "Men",
      subcategory: "",
      price: "",
      oldPrice: "",
      stock: "",
      image: "",
      description: "",
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  /* ---------------------------------------------------------
     HANDLE LOCAL FILE UPLOAD
     Converts the chosen image file to a base64 data URL
     and stores it in draft.image.
  --------------------------------------------------------- */
  function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    /* Validate: must be an image */
    if (!file.type.startsWith("image/")) {
      setNotice("Please choose an image file (jpg, png, webp…).");
      return;
    }

    /* Validate: max 2 MB to keep things reasonable */
    const MAX_SIZE = 2 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      setNotice("Image is too large. Please use an image under 2 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      updateDraft("image", reader.result); // base64 data URL
      setNotice("Image loaded. Don't forget to save the product.");
    };

    reader.onerror = () => {
      setNotice("Could not read that file. Try another image.");
    };

    reader.readAsDataURL(file);
  }

  function clearImage() {
    updateDraft("image", "");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(draft.price);
    const stock = Number(draft.stock);
    const oldPrice = Number(draft.oldPrice || draft.price);

    if (!draft.name.trim()) {
      setNotice("Enter a product name.");
      return;
    }
    if (!draft.image) {
      setNotice("Upload a product image.");
      return;
    }
    if (!Number.isFinite(price) || price <= 0) {
      setNotice("Enter a valid product price.");
      return;
    }
    if (!Number.isInteger(stock) || stock < 0) {
      setNotice("Stock must be a whole number of zero or more.");
      return;
    }

    const productData = {
      name: draft.name.trim(),
      category: draft.category,
      subcategory: draft.subcategory.trim() || "General",
      price,
      oldPrice,
      stock,
      image: draft.image,
      description: draft.description.trim(),
    };

    if (editingProduct) {
      onSaveProduct({ ...editingProduct, ...productData });
      setNotice("Product updated.");
    } else {
      onAddProduct(productData);
      setNotice("Product added.");
    }

    resetDraft();
  }

  return (
    <div
      className="sf-modal-backdrop sf-admin-backdrop"
      onClick={onClose}
    >
      <section
        className="sf-admin-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Store administration"
        onClick={(event) => event.stopPropagation()}
      >
        {/* HEADER */}
        <div className="sf-admin-header">
          <div>
            <span className="sf-eyebrow">STORE MANAGEMENT</span>
            <h2>
              <LayoutDashboard size={22} />
              Admin dashboard
            </h2>
          </div>
          <button
            className="sf-icon-button"
            onClick={onClose}
            aria-label="Close admin dashboard"
          >
            <X size={23} />
          </button>
        </div>

        {/* NOT AUTHENTICATED — LOGIN FORM */}
        {!authenticated ? (
          <form className="sf-admin-login" onSubmit={onLogin}>
            <div className="sf-admin-lock">
              <ShieldCheck size={34} />
            </div>
            <h3>Administrator access</h3>
            <p>
              Enter the configured demo password to open the catalogue
              management tools.
            </p>

            <label htmlFor="sf-admin-password">Demo password</label>
            <input
              id="sf-admin-password"
              type="password"
              value={password}
              onChange={(event) =>
                onPasswordChange(event.target.value)
              }
              placeholder="Enter demo password"
              required
            />

            <button className="sf-button sf-button-dark" type="submit">
              SIGN IN
            </button>

            <small>
              Demo protection only. Use real server-side authentication
              before publishing.
            </small>
          </form>
        ) : (
          /* AUTHENTICATED — FULL DASHBOARD */
          <div className="sf-admin-body">
            <div className="sf-admin-tabs">
              <button
                type="button"
                className={
                  tab === "overview" ? "sf-admin-tab-active" : ""
                }
                onClick={() => setTab("overview")}
              >
                <LayoutDashboard size={17} /> Overview
              </button>

              <button
                type="button"
                className={
                  tab === "products" ? "sf-admin-tab-active" : ""
                }
                onClick={() => setTab("products")}
              >
                <Package size={17} /> Products
              </button>
            </div>

            {/* OVERVIEW TAB */}
            {tab === "overview" && (
              <div className="sf-admin-overview">
                <div className="sf-admin-stat-grid">
                  <article className="sf-admin-stat">
                    <span>Total products</span>
                    <strong>{products.length}</strong>
                    <Package size={21} />
                  </article>

                  <article className="sf-admin-stat">
                    <span>In stock</span>
                    <strong>
                      {
                        products.filter(
                          (product) => Number(product.stock) > 0
                        ).length
                      }
                    </strong>
                    <CheckCircle2 size={21} />
                  </article>

                  <article className="sf-admin-stat">
                    <span>Out of stock</span>
                    <strong>
                      {
                        products.filter(
                          (product) => Number(product.stock) <= 0
                        ).length
                      }
                    </strong>
                    <AlertCircle size={21} />
                  </article>
                </div>

                <div className="sf-admin-welcome">
                  <h3>Manage your catalogue</h3>
                  <p>
                    Add new items, update prices and stock, or remove
                    products from the current demo catalogue.
                  </p>

                  <button
                    className="sf-button sf-button-dark"
                    onClick={() => {
                      onCancelEditing();
                      setTab("products");
                      setNotice("");
                    }}
                  >
                    <Plus size={17} /> ADD A PRODUCT
                  </button>
                </div>
              </div>
            )}

            {/* PRODUCTS TAB */}
            {tab === "products" && (
              <div className="sf-admin-products">
                <div className="sf-admin-product-toolbar">
                  <div>
                    <h3>Product catalogue</h3>
                    <p>{products.length} catalogue items</p>
                  </div>

                  <button
                    className="sf-button sf-button-dark"
                    onClick={() => {
                      onCancelEditing();
                      resetDraft();
                      setNotice("");
                    }}
                  >
                    <Plus size={16} /> ADD PRODUCT
                  </button>
                </div>

                {notice && (
                  <p className="sf-admin-notice" role="status">
                    {notice}
                  </p>
                )}

                <div className="sf-form-field sf-admin-search">
                  <label htmlFor="sf-admin-search">
                    Search catalogue
                  </label>
                  <input
                    id="sf-admin-search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search by name or category"
                  />
                </div>

                {/* PRODUCT FORM */}
                <form
                  className="sf-admin-product-form"
                  onSubmit={handleSubmit}
                >
                  <h4>
                    {editingProduct ? "Edit product" : "Add product"}
                  </h4>

                  <div className="sf-form-grid">
                    <div className="sf-form-field">
                      <label htmlFor="sf-admin-name">
                        Product name *
                      </label>
                      <input
                        id="sf-admin-name"
                        value={draft.name}
                        onChange={(event) =>
                          updateDraft("name", event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="sf-form-field">
                      <label htmlFor="sf-admin-category">
                        Category
                      </label>
                      <select
                        id="sf-admin-category"
                        value={draft.category}
                        onChange={(event) =>
                          updateDraft("category", event.target.value)
                        }
                      >
                        {CATEGORIES.filter((c) => c !== "All").map(
                          (category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          )
                        )}
                      </select>
                    </div>

                    <div className="sf-form-field">
                      <label htmlFor="sf-admin-subcategory">
                        Subcategory
                      </label>
                      <input
                        id="sf-admin-subcategory"
                        value={draft.subcategory}
                        onChange={(event) =>
                          updateDraft(
                            "subcategory",
                            event.target.value
                          )
                        }
                        placeholder="e.g. Shirts"
                      />
                    </div>

                    <div className="sf-form-field">
                      <label htmlFor="sf-admin-price">
                        Price (KES) *
                      </label>
                      <input
                        id="sf-admin-price"
                        type="number"
                        min="1"
                        value={draft.price}
                        onChange={(event) =>
                          updateDraft("price", event.target.value)
                        }
                        required
                      />
                    </div>

                    <div className="sf-form-field">
                      <label htmlFor="sf-admin-old-price">
                        Previous price (KES)
                      </label>
                      <input
                        id="sf-admin-old-price"
                        type="number"
                        min="0"
                        value={draft.oldPrice}
                        onChange={(event) =>
                          updateDraft("oldPrice", event.target.value)
                        }
                      />
                    </div>

                    <div className="sf-form-field">
                      <label htmlFor="sf-admin-stock">
                        Stock quantity *
                      </label>
                      <input
                        id="sf-admin-stock"
                        type="number"
                        min="0"
                        step="1"
                        value={draft.stock}
                        onChange={(event) =>
                          updateDraft("stock", event.target.value)
                        }
                        required
                      />
                    </div>
                  </div>

                  {/* -------- IMAGE UPLOAD -------- */}
                  <div className="sf-form-field">
                    <label>Product image *</label>

                    <div className="sf-upload-area">
                      {draft.image ? (
                        <div className="sf-upload-preview">
                          <img
                            src={draft.image}
                            alt="Product preview"
                          />
                          <div className="sf-upload-preview-actions">
                            <button
                              type="button"
                              className="sf-upload-btn"
                              onClick={() =>
                                fileInputRef.current?.click()
                              }
                            >
                              <Upload size={14} /> REPLACE
                            </button>
                            <button
                              type="button"
                              className="sf-upload-btn danger"
                              onClick={clearImage}
                            >
                              <Trash2 size={14} /> REMOVE
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="sf-upload-drop"
                          onClick={() =>
                            fileInputRef.current?.click()
                          }
                        >
                          <ImageIcon size={32} />
                          <strong>Click to upload an image</strong>
                          <span>JPG, PNG or WEBP · max 2 MB</span>
                        </button>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        hidden
                      />
                    </div>
                  </div>

                  <div className="sf-form-field">
                    <label htmlFor="sf-admin-description">
                      Description
                    </label>
                    <textarea
                      id="sf-admin-description"
                      rows={3}
                      value={draft.description}
                      onChange={(event) =>
                        updateDraft(
                          "description",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  <div className="sf-admin-form-actions">
                    <button
                      className="sf-button sf-button-dark"
                      type="submit"
                    >
                      {editingProduct ? "SAVE CHANGES" : "ADD PRODUCT"}
                    </button>

                    {editingProduct && (
                      <button
                        className="sf-button sf-button-light"
                        type="button"
                        onClick={() => {
                          onCancelEditing();
                          resetDraft();
                        }}
                      >
                        CANCEL EDIT
                      </button>
                    )}
                  </div>
                </form>

                {/* PRODUCT LIST */}
                <div className="sf-admin-product-list">
                  {filteredProducts.map((product) => (
                    <article
                      className="sf-admin-product-row"
                      key={product.id}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <div className="sf-admin-product-details">
                        <strong>{product.name}</strong>
                        <span>{product.category}</span>
                        <span>{formatPrice(product.price)}</span>
                        <small>Stock: {product.stock ?? 0}</small>
                      </div>

                      <div className="sf-admin-product-actions">
                        <button
                          aria-label={`Edit ${product.name}`}
                          onClick={() => onStartEditing(product)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          aria-label={`Delete ${product.name}`}
                          onClick={() => {
                            const confirmed = window.confirm(
                              `Remove "${product.name}" from the catalogue?`
                            );
                            if (confirmed) {
                              onDeleteProduct(product.id);
                              setNotice("Product deleted.");
                            }
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </article>
                  ))}

                  {filteredProducts.length === 0 && (
                    <p className="sf-admin-empty">
                      No products match that search.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}