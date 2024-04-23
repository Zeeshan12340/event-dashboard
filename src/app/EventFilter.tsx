import React from "react";
import Box from "@mui/material/Box";
import Popper, { PopperPlacementType } from "@mui/material/Popper";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

export default function EventFilter() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [placement, setPlacement] = React.useState<PopperPlacementType>();
  const open = Boolean(anchorEl);
  const [categorySelect, setcategorySelect] = React.useState("Web Development");

  const handleClick = (newPlacement: PopperPlacementType) => (
    event: React.MouseEvent<HTMLElement>
  ) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setPlacement(newPlacement);
  };

  function handleChange(event: SelectChangeEvent) {
    setcategorySelect(event.target.value);
  }

  return (
    <div>
      <div className="cursor-pointer" onClick={handleClick("bottom-end")}>
        {/* prettier-ignore */}
        <svg className="cursor-pointer heart-icon" width="50" height="50" stroke={open? "#5041bc": "currentColor"} color={open? "#5041bc": "none"} strokeWidth={0.1} viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g opacity="0.32" filter="url(#filter0_f_4_1229)">
              <circle cx="31" cy="31" r="15" fill="#5041BC" />
            </g>
            <rect x="11.5" y="2.5" width="39" height="39" rx="3.5" fill="white" stroke="#E2DFF8"/>
            <path d="M34 28C34.2652 28 34.5196 28.1054 34.7071 28.2929C34.8946 28.4804 35 28.7348 35 29C35 29.2652 34.8946 29.5196 34.7071 29.7071C34.5196 29.8946 34.2652 30 34 30H28C27.7348 30 27.4804 29.8946 27.2929 29.7071C27.1054 29.5196 27 29.2652 27 29C27 28.7348 27.1054 28.4804 27.2929 28.2929C27.4804 28.1054 27.7348 28 28 28H34ZM38 22C38.2652 22 38.5196 22.1054 38.7071 22.2929C38.8946 22.4804 39 22.7348 39 23C39 23.2652 38.8946 23.5196 38.7071 23.7071C38.5196 23.8946 38.2652 24 38 24H24C23.7348 24 23.4804 23.8946 23.2929 23.7071C23.1054 23.5196 23 23.2652 23 23C23 22.7348 23.1054 22.4804 23.2929 22.2929C23.4804 22.1054 23.7348 22 24 22H38ZM41 16C41.2652 16 41.5196 16.1054 41.7071 16.2929C41.8946 16.4804 42 16.7348 42 17C42 17.2652 41.8946 17.5196 41.7071 17.7071C41.5196 17.8946 41.2652 18 41 18H21C20.7348 18 20.4804 17.8946 20.2929 17.7071C20.1054 17.5196 20 17.2652 20 17C20 16.7348 20.1054 16.4804 20.2929 16.2929C20.4804 16.1054 20.7348 16 21 16H41Z" fill="currentColor" />
            <defs>
              <filter id="filter0_f_4_1229" x="0" y="0" width="54" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="8" result="effect1_foregroundBlur_4_1229" />
              </filter>
            </defs>
        </svg>
      </div>
      <Popper
        id="simple-popper"
        open={open}
        anchorEl={anchorEl}
        placement={placement}
      >
        <div className="triangle"></div>
        <Box
          className="rounded-lg"
          sx={{
            p: 3,
            bgcolor: "background.paper",
            boxShadow: "-10px 10px 8px #e0e0e0",
            width: "420px",
          }}
        >
          <InputLabel>Category</InputLabel>
          <Select
            sx={{ bgcolor: "grey.300", padding: 0, margin: 0 }}
            value={categorySelect}
            label="Category"
            onChange={handleChange}
            className="h-10"
          >
            <MenuItem value={"Web Development"}>Web Development</MenuItem>
            <MenuItem value={"Film"}>Film</MenuItem>
            <MenuItem value={"Concert"}>Concert</MenuItem>
          </Select>

          <InputLabel className="mt-2">Date & Time</InputLabel>
          <div className="flex">
            <div className="mr-4">
              <div>From</div>
              <input
                type="date"
                className="h-10 w-48 border border-gray-300 rounded-md bg-gray-300 p-2"
              />
            </div>
            <div>
              <div>To</div>
              <input
                type="date"
                className="h-10 w-48 border border-gray-300 rounded-md bg-gray-300 p-2"
              />
            </div>
          </div>
        </Box>
      </Popper>
    </div>
  );
}
