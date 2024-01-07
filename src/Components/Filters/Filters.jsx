import { Button, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiltersState } from "../Context/filterContext";
import Rating from "./Rating";
import Ratingg from "./Rating";
import "./styles/filter.scss";
const Filters = () => {
  const dispatch = useDispatch();
  const {
    productDispatch,
    productState: { sort, byRating, category },
  } = FiltersState();
  // make state for rating

  return (
    <div className="filters mt-4">
      <h5 className="fs-5">Filter Products</h5>
      <FormControl
        style={{ width: "95%" }}
        type="search"
        placeholder="Search a product..."
        className="m-auto filter__search"
        aria-label="Search"
        onChange={(e) => {
          productDispatch({
            type: "FILTER_BY_SEARCH",
            payload: e.target.value,
          });
        }}
      />
      <hr />
      <div>
        <h5 className="fs-5">Categories</h5>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            value=""
            id="flexCheckDefault"
            onChange={(e) => {
              productDispatch({
                type: "SORT_BY_CATEGORY",
                payload: "Women's Fashion",
              });
            }}
            checked={category === "Women's Fashion" ? true : false}
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Women's Fashion
          </label>
        </div>
        <div className="form-check">
          <input
            onChange={(e) => {
              productDispatch({
                type: "SORT_BY_CATEGORY",
                payload: "Men's Fashion",
              });
            }}
            checked={category === "Men's Fashion" ? true : false}
            className="form-check-input"
            type="radio"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Men's Fashion
          </label>
        </div>
        <div className="form-check">
          <input
            onChange={(e) => {
              productDispatch({
                type: "SORT_BY_CATEGORY",
                payload: "Electronics",
              });
            }}
            checked={category === "Electronics" ? true : false}
            className="form-check-input"
            type="radio"
            value=""
            id="flexCheckChecked"
          />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Electronics
          </label>
        </div>
      </div>
      <hr />
      <div>
        <h5 className="fs-5">Price</h5>
        <span>
          <Form.Check
            style={{ cursor: "pointer" }}
            inline
            label="LowPrice"
            name="group1"
            type="radio"
            id={`inline-1`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "lowToHigh",
              })
            }
            checked={sort === "lowToHigh" ? true : false}
          />
        </span>
        <span>
          <Form.Check
            style={{ cursor: "pointer" }}
            inline
            label="HighPrice"
            name="group1"
            type="radio"
            id={`inline-2`}
            onChange={() =>
              productDispatch({
                type: "SORT_BY_PRICE",
                payload: "highToLow",
              })
            }
            checked={sort === "highToLow" ? true : false}
          />
        </span>
      </div>
      <hr />
      <div>
      <h5 className="fs-5">Rating</h5>
        <span>
          <label>Rating: </label>
          <Rating
            rating={byRating}
            onClick={(i) =>
              productDispatch({
                type: "FILTER_BY_RATING",
                payload: i + 1,
              })
            }
            style={{ cursor: "pointer" }}
          />
        </span>
      </div>

      <Button
        className="clearFilter px-4 mt-2 border-0 mx-3"
        onClick={() =>
          productDispatch({
            type: "CLEAR_FILTERS",
          })
        }
      >
        Clear Filters
      </Button>
    </div>
  );
};

export default Filters;
