import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyArtCraftListCard = ({ craftItem, craftItems, setCraftItems }) => {
  const { _id, itemName, customization, stockStatus, photo, price, rating } =
    craftItem;

  const handelDelete = (_id) => {
    console.log(_id);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://assigenment-server-ten.vercel.app/artAndCraft/${_id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "Your product has been deleted.",
                icon: "success",
              });
            }

            const remaining = craftItems.filter(
              (craftItem) => craftItem._id !== _id
            );
            setCraftItems(remaining);
          });
      }
    });
  };

  return (
    <div>
      <div className="container m-auto my-10 p-5">
        <div className="flex lg:flex-row flex-col gap-20 bg-base-100 shadow-xl p-10">
          <div className="">
            <img
              src={photo}
              alt=""
              className="lg:w-96 md:w-96 w-80 h-60 lg:h-full rounded-lg"
            />
          </div>
          <div className="space-y-3">
            <h2 className="card-title">{itemName}</h2>
            <div className="flex lg:gap-5 gap-3 lg:flex-row flex-col">
              <h1>
                <span className="text-lg font-semibold">Customization : </span>
                {customization}
              </h1>
              <h2>
                <span className="text-lg font-semibold">Stock Status : </span>
                {stockStatus}
              </h2>
            </div>
            <div className="flex lg:gap-5 gap-3 lg:flex-row flex-col">
              <h1>
                <span className="text-lg font-semibold">Price : </span>
                {price}
              </h1>
              <h2>
                <span className="text-lg font-semibold">Rating : </span>
                {rating}
              </h2>
            </div>
            <div className="mt-20 flex lg:flex-row md:flex-row">
              <Link to={`/update/${_id}`}>
                <button className="btn btn-primary">Update</button>
              </Link>
              <button
                onClick={() => handelDelete(_id)}
                className="btn btn-error ml-6"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

MyArtCraftListCard.propTypes = {
  craftItem: PropTypes.object,
  craftItems: PropTypes.object.isRequired,
  setCraftItems: PropTypes.func,
};

export default MyArtCraftListCard;
