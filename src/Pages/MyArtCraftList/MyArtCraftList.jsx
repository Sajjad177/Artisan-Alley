import { useEffect, useState } from "react";
import useAuth from "../../Hooks/useAuth";
import MyArtCraftListCard from "../../Components/MyArtCraftListCard/MyArtCraftListCard";

const MyArtCraftList = () => {
  const { user } = useAuth();
  const [craftItems, setCraftItems] = useState([]);

  useEffect(() => {
    fetch(
      `https://assigenment-server-ten.vercel.app/myCraftItem/${user?.email}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCraftItems(data);
        console.log(data);
      });
  }, [user]);

  return (
    <div className="container m-auto">
      <div className="text-center">
        <details className="dropdown">
          <summary className="m-1 btn text-lg">Sort</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-44">
            <li>
              <a>Yes</a>
            </li>
            <li>
              <a>No</a>
            </li>
          </ul>
        </details>
      </div>
      <div>
        {craftItems?.map((craftItem) => (
          <MyArtCraftListCard
            key={craftItem._id}
            craftItem={craftItem}
            craftItems={craftItems}
            setCraftItems={setCraftItems}
          ></MyArtCraftListCard>
        ))}
      </div>
    </div>
  );
};

export default MyArtCraftList;
