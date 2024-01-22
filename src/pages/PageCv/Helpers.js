export const updateEmploiArr = (obj) => {
  const { newData, create } = obj;
  const updatedEmploiArr = newData.map((item) => ({
    key: item.id,
    label: item.name,
  }));

  create(updatedEmploiArr);
};

export const updateExperienceArr = (obj) => {
  const { newData, createNewExperience } = obj;
  const updateExperienceArr = newData.map((item) => ({
    key: item.id,
    label: {
      nomExperience: item.name,
      nomEntreprise:item.establishment,
      lieux: item.location,
      experienceDate: item.startDate,
      dateDebut:  item.endDate,
      description: item.description,
      type: item.type,
    },
  }));

  createNewExperience(updateExperienceArr);
};

export const updateloisirsArr = (obj) => {
  const { newData, create } = obj;
  const updateloisirsArr = newData.map((item) => ({
    key: item.id,
    label: item.name,
  }));

  create(updateloisirsArr);
};
