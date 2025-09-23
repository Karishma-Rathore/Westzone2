"use client";
import { OrderColumn } from "./components/OrderColumn";

// Fake orders with a "status" field
const orders = [
  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },  {
    id: "yEQdW6yLh",
    name: "Joy Ocampo",
    address:
      "Dubai Al Noor 2 / Room 201 | Tecom Al Barsha Heightts Al Thanyah First Street",
    time: "1 min ago",
    total: 179.39,
    distance: "0.22m",
    status: "new",
  },
  {
    id: "wVGee0gUeL",
    name: "Shiela Amor",
    address: "UAE 105 | Al Thouraya Building Sheikh Zayed Road",
    time: "1 min ago",
    total: 149.49,
    distance: "0.5km",
    status: "new",
  },
  {
    id: "CagEPqKYk3",
    name: "Elizabeth Tan",
    address: "Dubai Flat 507 | Al ahli house B Behind tea junction",
    time: "6 min ago",
    total: 99.99,
    distance: "0.52km",
    status: "process",
  },
  {
    id: "y0bCGfcgbu",
    name: "Jordan Lacerna",
    address: "Dubai room 15 | block A",
    time: "4 min ago",
    total: 75.5,
    distance: "3.08km",
    status: "process",
  },
  {
    id: "rdtN9n2lg0",
    name: "Jayson Bathan",
    address: "UAE Block 5, room 5411 | Al bustan Centre",
    time: "11 hrs ago",
    total: 250,
    distance: "2.01km",
    late: true,
    status: "delivery",
  },
  {
    id: "A7SrHRiSg2",
    name: "Michay Rodriguez",
    address: "Sharjah 218 | Normandy 2 bldg",
    time: "11 hrs ago",
    total: 300,
    distance: "7.52km",
    status: "delivery",
  },
  // Example extra statuses for other tables
  {
    id: "sub123",
    name: "Ali Khan",
    address: "Dubai Marina Mall",
    time: "2 hrs ago",
    total: 200,
    distance: "1.2km",
    status: "pending", // Pending Confirmation
  },
  {
    id: "miss456",
    name: "John Doe",
    address: "Sharjah Central",
    time: "3 hrs ago",
    total: 500,
    distance: "5.4km",
    status: "missing", // Delivered with missing
  },
  {
    id: "del789",
    name: "Maria Silva",
    address: "Bur Dubai",
    time: "5 hrs ago",
    total: 350,
    distance: "2.7km",
    status: "delivered", // Delivered Order List
  },
  {
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },{
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },{
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },{
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },{
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },{
    id: "can111",
    name: "Ravi Kumar",
    address: "Karama Dubai",
    time: "1 day ago",
    total: 120,
    distance: "4.3km",
    status: "cancelled", // Cancelled Order List
  },
];



// Main Page
export default function OrdersPage() {
  return (
    <div className="container mx-auto p-4 flex flex-col gap-10 ">
      <h1 className="text-4xl tracking-tight font-bold text-center mb-4">
        Orders
      </h1>
      <p className="text-center text-2xl font-bold text-red-500 mb-6">
        Groceries should be delivered within 25 minutes
      </p>

      <div className="flex flex-col xl:flex-row gap-4">
        <OrderColumn
          title="New Order List"
          backgroundColor="lightblue"
          data={orders.filter((o) => o.status === "new")}
        />
        <OrderColumn
          title="Orders Under Process List"
          backgroundColor="orange"
          data={orders.filter((o) => o.status === "process")}
        />
        <OrderColumn
          title="Orders Gone For Delivery"
          backgroundColor="lightgreen"
          data={orders.filter((o) => o.status === "delivery")}
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-4">
        <OrderColumn
          title="Pending Confirmation(Substitute Products)"
          backgroundColor="cyan"
          data={orders.filter((o) => o.status === "pending")}
        />
        <OrderColumn
          title="Delivered Order with Missing Products"
          backgroundColor="gold"
          data={orders.filter((o) => o.status === "missing")}
        />
      </div>

      <div className="flex flex-col xl:flex-row gap-4">
        <OrderColumn
          title="Delivered Order List"
          backgroundColor="lightgray"
          data={orders.filter((o) => o.status === "delivered")}
        />
        <OrderColumn
          title="Cancelled Order List"
          backgroundColor="pink"
          data={orders.filter((o) => o.status === "cancelled")}
        />
      </div>
    </div>
  );
}
