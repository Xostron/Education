import React, { useState, useRef, useMemo, useEffect } from "react";
import { Bbtn, Bear, Clock } from "../../component";

const About = () => {
	return (
		<div>
			<div>About</div>
			<Bbtn />
			<Clock />
      <Bear/>
		</div>
	);
};
export default About;
