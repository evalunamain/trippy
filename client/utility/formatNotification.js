import { NOTIFICATION_TYPES, WAYPOINT_TYPES, capitalizeFirstLetter, findKeyByVal } from '../constants';



export default function(data, notificationType) {
  switch (notificationType) {
    case NOTIFICATION_TYPES.RECEIVE_WAYPOINT: {
      const author = data.author.name;
      let waypointType = findKeyByVal(WAYPOINT_TYPES,data.type);
      waypointType = waypointType ? capitalizeFirstLetter(waypointType) : 'Waypoint';
      let str = `${author} added a ${waypointType}.`;
      return str;
    }
  }
}