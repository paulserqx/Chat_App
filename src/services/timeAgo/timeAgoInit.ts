import TimeAgo from "javascript-time-ago";
import bg from "javascript-time-ago/locale/bg";
import ru from "javascript-time-ago/locale/ru";
import it from "javascript-time-ago/locale/it";
import en from "javascript-time-ago/locale/en";
import { useRouter } from "next/router";

TimeAgo.addDefaultLocale(en);

TimeAgo.addLocale(bg);
TimeAgo.addLocale(ru);
TimeAgo.addLocale(it);
TimeAgo.addLocale(en);

export const useTimeAgo = () => {
  const router = useRouter();
  const timeAgo = new TimeAgo(router.locale || "en");

  const formatTime = (time: number) => {
    return timeAgo.format(time);
  };
  return formatTime;
};
