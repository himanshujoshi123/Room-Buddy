// ShowDetails.js
import React from "react";

const ShowDetails = ({ user, onClose }) => {
  return (
    <div className="modal-overlay" title="Model Box">
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="font-bold ml-6 text-xl bg-slate-200 shadow-lg rounded-2xl px-4">
            {user.userName}'s Details
          </h2>
          <button
            onClick={onClose}
            className="text-white font-bold bg-red-600 px-1 rounded-md hover: border-red-500 hover:bg-white hover:text-red-500 hover:border-2"
            title = "Close"
          >
            X
          </button>
        </div>
        <div className="modal-body">
          <table className="w-full">
            <tbody>
              <TableRow label="Age" value={user.Age} />
              <TableRow label="Food Choices" value={user.FoodChoices} />
              <TableRow label="Occupation" value={user.Occupation} />
              <TableRow label="Budget" value={user.budget} />
              <TableRow label="Date" value={user.date} />
              <TableRow label="Email" value={user.email} />
              <TableRow label="Gender" value={user.gender} />
              <TableRow label="Location" value={user.location} />
              <TableRow label="Looking For" value={user.looking}  />
              <TableRow
                label="Habits"
                value={
                  user.habits && user.habits.length > 0
                    ? user.habits.join(", ")
                    : "No habits specified"
                }
              />
              <TableRow label="User Description" value={user.userDescription} />
            </tbody>
          </table>
          <div className="flex justify-center">
          <a href={`https://wa.me/${user.mobileNumber}?text=I am ${user.userName}, I just looked at your profile on Room-Buddy`} target="_blank" rel="noopener noreferrer">
  <button className="font-bold cursor-pointer border px-3  bg-green-500 mt-2 text-white rounded-md shadow-lg hover: border-green-500 hover:bg-white hover:text-green-500">Whatsapp Me</button>
</a>

          </div>
        </div>
      </div>
    </div>
  );
};

const TableRow = ({ label, value }) => (
  <tr>
    <td className="font-bold">{label}</td>
    <td>:</td>
    <td>{value}</td>
  </tr>
);

export default ShowDetails;
