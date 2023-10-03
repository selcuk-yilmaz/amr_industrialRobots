# Required Updates Prior to Project Execution

Before running the project, you will need to make the following updates to the .env file:

- Modify the "REACT_APP_ROSBRIDGE_SERVER_IP" line with the IP address of your computer.

- Change the topic and parameter names as necessary to match your workspaces:

    - "REACT_APP_CMD_VEL_TOPIC": set to "/cmd_vel"
    - "REACT_APP_ODOM_TOPIC": set to "mir_robot1/mobile_base_controller/odom"
    - "REACT_APP_BASE_CANCEL_TOPIC": set to "/mir_robot1/move_base/cancel"
    - "REACT_APP_ROBOT_POSE_PARAM": set to "/robot_pose"
    - "REACT_APP_PLAN_PARAM": set to "/mir_robot1/move_base_node/SBPLLatticePlanner/plan"
    - "REACT_APP_GOAL_PARAM": set to "/mir_robot1/move_base_simple/goal"
    - "REACT_APP_AMCL_POSE_PARAM": set to "saveAMCLPose"
    - "REACT_APP_CHARGE_PARAM": set to "/charge_params"
    - "REACT_APP_EMERGENCY_PARAM": set to "/EmergencyStop"

# How to Run the Project

To run the project, follow these steps:

1. Start ROS by running "roscore" or "rosbridge".
2. Launch React by running "npm start".




![homePage](https://github.com/selcuk-yilmaz/ServiceRobot/assets/99830247/b9a1055e-8274-4351-9cb3-41f93c8b1162)
