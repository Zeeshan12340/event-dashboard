import { Box, Modal, Typography } from "@mui/material";
import { eClose } from "@/features/eventSlice";
import { convertToLocalTime } from "./utils";
import { useAppDispatch } from "@/features/hooks";
import { entities } from "@/features/eventSlice";

type Event = {
  title: string;
  start: string;
  timezone: string;
  entities: entities;
  description: string;
  liked: boolean;
  open: boolean;
 };

 interface EventModalProps {
  event: Event;
  index: number;
 }

const EventModal: React.FC<EventModalProps> = ({ event, index }) => {
  const dispatch = useAppDispatch();

  const handleClose = (index: number) => {
    dispatch(eClose(index));
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    height: 350,
    bgcolor: "background.paper",
    border: "0px solid #000",
    borderRadius: 5,
    boxShadow: 24,
    p: 3,
    outline: 0,
  };

  return (
    <Modal
      open={event.open}
      onClose={() => handleClose(index)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography id="modal-modal-title" className="flex justify-between">
          <div className="font-bold text-2xl">{event.title}</div>
          <div className="text-gray-500 min-w-40">
            {convertToLocalTime(event.start, true)}, {convertToLocalTime(event.start)}
          </div>
        </Typography>
        <div className="text-lg text-gray-400">
          Category: <span className="font-bold">AI</span>
        </div>
        <div className="my-2 text-xl">Description</div>
        <Typography
          id="modal-modal-description"
          className="min-h-40 max-h-40 text-gray-500 overflow-auto"
        >
          {event.description}
        </Typography>
        <hr className="mt-4 border-1 border-black" />
        <div className="flex items-center justify-center text-xl mt-2">
          <svg
            className="mr-2"
            width="14"
            height="16"
            viewBox="0 0 14 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.00001 0.125C5.35957 0.126935 3.78688 0.779452 2.62692 1.93941C1.46696 3.09938 0.814442 4.67207 0.812507 6.3125C0.810542 7.65306 1.24843 8.95725 2.05901 10.025C2.05901 10.025 2.22776 10.2472 2.25532 10.2793L7.00001 15.875L11.7469 10.2764C11.7717 10.2466 11.941 10.025 11.941 10.025L11.9416 10.0233C12.7517 8.95603 13.1894 7.65245 13.1875 6.3125C13.1856 4.67207 12.5331 3.09938 11.3731 1.93941C10.2131 0.779452 8.64044 0.126935 7.00001 0.125ZM7.00001 8.5625C6.555 8.5625 6.11998 8.43054 5.74997 8.18331C5.37996 7.93607 5.09157 7.58467 4.92128 7.17354C4.75098 6.7624 4.70642 6.31 4.79324 5.87355C4.88006 5.43709 5.09435 5.03618 5.40902 4.72151C5.72368 4.40684 6.1246 4.19255 6.56105 4.10573C6.99751 4.01892 7.44991 4.06347 7.86104 4.23377C8.27218 4.40407 8.62358 4.69246 8.87081 5.06247C9.11805 5.43248 9.25001 5.86749 9.25001 6.3125C9.24926 6.90901 9.01197 7.48087 8.59017 7.90267C8.16838 8.32446 7.59652 8.56176 7.00001 8.5625Z"
              fill="#5041BC"
            />
          </svg>
          {event.entities[0] ? (
            <div className="text-gray-700">{event.entities[0].name}</div>
          ) : (
            <div className="text-gray-700">{event.timezone}</div>
          )}
        </div>
      </Box>
    </Modal>
  );
};

export default EventModal;
