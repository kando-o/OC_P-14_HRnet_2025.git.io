import { configureStore } from "@reduxjs/toolkit";
import employee  from "./features/employees";

export const store = configureStore ({

	reducer : {
		employee
	}
})