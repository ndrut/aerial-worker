// @refresh reload
import { StartClient } from "@solidjs/start/client";
import { hydrate } from "solid-js/web";

hydrate(() => <StartClient />, document.getElementById("app")!);