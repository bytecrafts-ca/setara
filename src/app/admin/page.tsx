"use client";

import { FormEvent, useMemo, useState } from "react";
import type { Condition, Fulfillment, Product } from "@/data/products";
import { formatCAD } from "@/lib/format";
import { useCatalog } from "@/store/catalog";
import { useOrders } from "@/store/orders";

type Tab = "products" | "orders" | "rentals" | "custom" | "add";

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>("products");
  const products = useCatalog((s) => s.products);
  const { addProduct, updateProduct, removeProduct, markUnavailable, resetCatalog } =
    useCatalog();
  const {
    orders,
    customRequests,
    rentalRequests = [],
    updateOrder,
    updateCustomRequest,
    updateRentalRequest,
  } = useOrders();
  const [message, setMessage] = useState("");

  const sortedProducts = useMemo(
    () => [...products].sort((a, b) => a.name.localeCompare(b.name)),
    [products],
  );

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const area = String(fd.get("area")) as Product["area"];
    const id = `${area}-${Date.now()}`;
    const fulfillmentRaw = String(fd.get("fulfillment") || "pickup");
    const fulfillment = (
      fulfillmentRaw === "pickup-only"
        ? ["pickup-only"]
        : fulfillmentRaw.split(",")
    ) as Fulfillment[];

    const product: Product = {
      id,
      name: String(fd.get("name") || ""),
      description: String(fd.get("description") || ""),
      price: Number(fd.get("price") || 0),
      images: [],
      category: String(fd.get("category") || "Merchandise"),
      area,
      tags: area === "retail" ? ["new"] : [area],
      sizes: String(fd.get("sizes") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      available: true,
      quantity: Number(fd.get("quantity") || 1),
      isNew: area === "retail",
      occasion:
        area === "retail" && fd.get("occasion")
          ? [String(fd.get("occasion"))]
          : undefined,
      contents: String(fd.get("contents") || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      condition:
        area === "resale"
          ? (String(fd.get("condition") || "good") as Condition)
          : undefined,
      defects: area === "resale" ? String(fd.get("defects") || "") : undefined,
      dimensions:
        area !== "retail" ? String(fd.get("dimensions") || "") || undefined : undefined,
      deposit: area === "rental" ? Number(fd.get("deposit") || 0) : undefined,
      minDays: area === "rental" ? Math.max(1, Number(fd.get("minDays") || 1)) : undefined,
      fulfillment,
      accent:
        area === "resale" ? "#7A8A7E" : area === "rental" ? "#6F8580" : "#6B8F71",
    };

    addProduct(product);
    setMessage(`Added “${product.name}”.`);
    setTab("products");
    e.currentTarget.reset();
  }

  return (
    <>
      <div className="page-hero">
        <h1>Admin</h1>
        <p>
          Add, edit, remove, and mark items sold. Manage orders, payment status,
          fulfillment, and custom gift quote requests. Data is saved in this
          browser for the demo.
        </p>
      </div>
      <div className="admin-layout">
        {message && <p className="notice">{message}</p>}
        <div className="admin-tabs">
          {(
            [
              ["products", "Products"],
              ["add", "Add listing"],
              ["orders", "Orders"],
              ["rentals", `Rental requests (${rentalRequests.length})`],
              ["custom", "Custom quotes"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={`chip ${tab === id ? "active" : ""}`}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
          <button
            type="button"
            className="chip"
            onClick={() => {
              resetCatalog();
              setMessage("Catalog reset to sample data.");
            }}
          >
            Reset sample catalog
          </button>
        </div>

        {tab === "products" && (
          <div style={{ overflowX: "auto" }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Area</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sortedProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <strong>{p.name}</strong>
                      <div style={{ opacity: 0.65 }}>{p.category}</div>
                    </td>
                    <td>{p.area}</td>
                    <td>{formatCAD(p.price)}</td>
                    <td>{p.available ? p.quantity : "Sold / unavailable"}</td>
                    <td>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                        <button
                          type="button"
                          className="chip"
                          onClick={() => {
                            markUnavailable(p.id);
                            setMessage(`Marked “${p.name}” unavailable.`);
                          }}
                        >
                          Mark sold
                        </button>
                        <button
                          type="button"
                          className="chip"
                          onClick={() => {
                            updateProduct(p.id, {
                              available: true,
                              quantity: Math.max(1, p.quantity || 1),
                            });
                            setMessage(`Restocked “${p.name}”.`);
                          }}
                        >
                          Restock
                        </button>
                        <button
                          type="button"
                          className="chip"
                          onClick={() => {
                            const next = window.prompt("New price (CAD)", String(p.price));
                            if (!next) return;
                            updateProduct(p.id, { price: Number(next) });
                            setMessage(`Updated price for “${p.name}”.`);
                          }}
                        >
                          Edit price
                        </button>
                        <button
                          type="button"
                          className="chip"
                          onClick={() => {
                            if (!window.confirm(`Remove ${p.name}?`)) return;
                            removeProduct(p.id);
                            setMessage(`Removed “${p.name}”.`);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {tab === "add" && (
          <form className="form-grid" onSubmit={onAdd} style={{ maxWidth: 720 }}>
            <div className="form-grid two">
              <label className="field">
                <span>Area</span>
                <select name="area" defaultValue="retail">
                  <option value="retail">Retail</option>
                  <option value="resale">Resale</option>
                  <option value="rental">Rental</option>
                </select>
              </label>
              <label className="field">
                <span>Category</span>
                <input name="category" defaultValue="Merchandise" required />
              </label>
            </div>
            <label className="field">
              <span>Name</span>
              <input name="name" required />
            </label>
            <label className="field">
              <span>Description</span>
              <textarea name="description" required />
            </label>
            <div className="form-grid two">
              <label className="field">
                <span>Price (CAD, daily rate for rentals)</span>
                <input name="price" type="number" min={0} step="0.01" required />
              </label>
              <label className="field">
                <span>Quantity</span>
                <input name="quantity" type="number" min={0} defaultValue={1} required />
              </label>
            </div>
            <label className="field">
              <span>Sizes / options (comma-separated)</span>
              <input name="sizes" placeholder="S, M, L" />
            </label>
            <label className="field">
              <span>Occasion (gift sets)</span>
              <input name="occasion" placeholder="birthday" />
            </label>
            <label className="field">
              <span>Contents (comma-separated)</span>
              <input name="contents" />
            </label>
            <label className="field">
              <span>Condition (resale)</span>
              <select name="condition" defaultValue="good">
                <option value="like-new">Like new</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="as-is">As-is</option>
              </select>
            </label>
            <label className="field">
              <span>Defects / wear (resale)</span>
              <textarea name="defects" placeholder="Be specific for buyers" />
            </label>
            <label className="field">
              <span>Dimensions (resale / rental)</span>
              <input name="dimensions" />
            </label>
            <div className="form-grid two">
              <label className="field">
                <span>Deposit (rental, CAD)</span>
                <input name="deposit" type="number" min={0} step="1" defaultValue={0} />
              </label>
              <label className="field">
                <span>Minimum days (rental)</span>
                <input name="minDays" type="number" min={1} step="1" defaultValue={1} />
              </label>
            </div>
            <label className="field">
              <span>Fulfillment</span>
              <select name="fulfillment" defaultValue="ship,delivery,pickup">
                <option value="ship,delivery,pickup">Ship / delivery / pickup</option>
                <option value="pickup,delivery">Pickup / delivery</option>
                <option value="pickup">Pickup</option>
                <option value="pickup-only">Pickup only</option>
              </select>
            </label>
            <button type="submit" className="btn secondary">
              Publish listing
            </button>
          </form>
        )}

        {tab === "orders" && (
          <div style={{ overflowX: "auto" }}>
            {orders.length === 0 ? (
              <p>No orders yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Total</th>
                    <th>Payment</th>
                    <th>Fulfillment</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <strong>{o.id}</strong>
                        <div style={{ opacity: 0.65 }}>
                          {new Date(o.createdAt).toLocaleString("en-CA")}
                        </div>
                        <div style={{ fontSize: "0.85rem" }}>
                          {o.lines.map((l) => (
                            <div key={l.name}>
                              {l.quantity}× {l.name}
                              {l.wrappingName ? ` + ${l.wrappingName}` : ""}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td>
                        {o.customerName}
                        <div>{o.email}</div>
                      </td>
                      <td>{formatCAD(o.total)}</td>
                      <td>{o.paymentStatus}</td>
                      <td>
                        {o.fulfillment} · {o.orderStatus}
                      </td>
                      <td>
                        <select
                          value={o.orderStatus}
                          onChange={(e) =>
                            updateOrder(o.id, {
                              orderStatus: e.target.value as typeof o.orderStatus,
                            })
                          }
                        >
                          <option value="paid">Paid</option>
                          <option value="pending-approval">Pending approval</option>
                          <option value="fulfilled">Fulfilled</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "rentals" && (
          <div style={{ overflowX: "auto" }}>
            {rentalRequests.length === 0 ? (
              <p>No rental requests yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Request</th>
                    <th>Dates</th>
                    <th>Contact</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {rentalRequests.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <strong>{r.id}</strong>
                        <div>{r.productName}</div>
                        <div style={{ opacity: 0.65 }}>{r.fulfillment}</div>
                        {r.notes && <div style={{ fontSize: "0.85rem" }}>{r.notes}</div>}
                      </td>
                      <td>
                        {r.startDate} to {r.endDate}
                        <div style={{ opacity: 0.65 }}>
                          {r.days} day{r.days === 1 ? "" : "s"}
                        </div>
                      </td>
                      <td>
                        {r.name}
                        <div>{r.email}</div>
                        <div>{r.phone}</div>
                      </td>
                      <td>
                        {formatCAD(r.rentalTotal)}
                        <div style={{ opacity: 0.65 }}>
                          + {formatCAD(r.deposit)} deposit
                        </div>
                      </td>
                      <td>
                        <select
                          value={r.status}
                          onChange={(e) =>
                            updateRentalRequest(r.id, {
                              status: e.target.value as typeof r.status,
                            })
                          }
                        >
                          <option value="new">New</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="out">Out on rental</option>
                          <option value="returned">Returned</option>
                          <option value="declined">Declined</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {tab === "custom" && (
          <div style={{ overflowX: "auto" }}>
            {customRequests.length === 0 ? (
              <p>No custom requests yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Request</th>
                    <th>Contact</th>
                    <th>Details</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {customRequests.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <strong>{r.id}</strong>
                        <div>{r.occasion}</div>
                        <div>Budget: {r.budget}</div>
                      </td>
                      <td>
                        {r.name}
                        <div>{r.email}</div>
                        <div>{r.phone}</div>
                      </td>
                      <td>
                        {r.details}
                        {r.photoName && <div>File: {r.photoName}</div>}
                      </td>
                      <td>
                        <select
                          value={r.status}
                          onChange={(e) =>
                            updateCustomRequest(r.id, {
                              status: e.target.value as typeof r.status,
                            })
                          }
                        >
                          <option value="new">New</option>
                          <option value="quoted">Quoted</option>
                          <option value="approved">Approved</option>
                          <option value="declined">Declined</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </>
  );
}
