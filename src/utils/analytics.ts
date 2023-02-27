export const trackPersonalGithub = () => trackEvent("github_personal_opened");
export const trackRepoGithub = () => trackEvent("github_repo_opened");
export const trackDownload = () => trackEvent("crate_downloaded");

export const trackEvent = (event: string) => {
  fetch(`https://nullitics.com/n.gif?u=${getCurrentUri()}/:${event}`, {
    mode: "no-cors",
  });
};

export const getCurrentUri = () => encodeURI(location.origin);
