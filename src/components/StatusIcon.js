import { Tooltip, OverlayTrigger } from "react-bootstrap";

const StatusIcon = (props) => {
  const StatusIconTagName = props.icon;

  return (
    <>
      {StatusIconTagName && (
        <div
          onClick={(e) => {
            if (props.tooltipText) {
              e.stopPropagation();
            }
          }}
        >
          <OverlayTrigger
            placement="top"
            delay={{ show: 50, hide: 400 }}
            overlay={(tooltipProps) => {
              if (props.tooltipText) {
                return (
                  <Tooltip id="status-button-tooltip" {...tooltipProps}>
                    {props.tooltipText}
                  </Tooltip>
                );
              } else {
                return <></>;
              }
            }}
          >
            <div>
              <StatusIconTagName
                className={`${
                  props.className ? props.className : "icon status"
                }`}
              />
            </div>
          </OverlayTrigger>
        </div>
      )}
    </>
  );
};

export default StatusIcon;
