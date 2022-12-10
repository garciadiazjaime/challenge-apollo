import { RESTDataSource } from "@apollo/datasource-rest";

export interface IUser {
  email: string;
  name?: string;
  lastName?: string;
}

export interface IPartner {
  email: string;
  name?: string;
  lastName?: string;

  website?: string;
  organization: string;
  linkedin?: string;
  telegram: string;
  twitter: string;
  supportedBefore: string;
  whySupport: string;
  acceptRules: boolean;
}

export default class UserAPI extends RESTDataSource {
  override baseURL = "http://127.0.0.1:3030/";

  async findUser({ email }): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email,
      },
    });

    return user;
  }

  async createOrUpdateUser(user: IUser): Promise<{}> {
    const data = await this.post("user", {
      body: user,
    });

    return data;
  }

  async findPartner(payload): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email: payload.email,
      },
    });

    const partner = await this.get("partner", {
      params: {
        email: user.email,
      },
    });

    return {
      ...user,
      ...partner,
    };
  }

  async createOrUpdatePartner(partner: IPartner): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email: partner.email,
      },
    });

    if (!user) {
      const userResponse = await this.post("user", {
        body: {
          email: partner.email,
          name: partner.name,
          lastName: partner.lastName,
        },
      });

      const partnerResponse = await this.post("partner", {
        body: {
          email: partner.email,

          website: partner.website,
          organization: partner.organization,
          linkedin: partner.linkedin,
          telegram: partner.telegram,
          twitter: partner.twitter,
          supportedBefore: partner.supportedBefore,
          whySupport: partner.whySupport,
          acceptRules: partner.acceptRules,
        },
      });

      return partnerResponse;
    }

    const userResponse = await this.put("user", {
      body: {
        email: partner.email,
        name: partner.name,
        lastName: partner.lastName,
      },
    });

    const partnerResponse = await this.put("partner", {
      body: {
        email: partner.email,

        website: partner.website,
        organization: partner.organization,
        linkedin: partner.linkedin,
        telegram: partner.telegram,
        twitter: partner.twitter,
        supportedBefore: partner.supportedBefore,
        whySupport: partner.whySupport,
        acceptRules: partner.acceptRules,
      },
    });

    return {
      ...userResponse,
      ...partnerResponse,
    };
  }

  async findHacker(payload): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email: payload.email,
      },
    });

    const hacker = await this.get("hacker", {
      params: {
        email: user.email,
      },
    });

    return {
      ...user,
      ...hacker,
    };
  }

  async createOrUpdateHacker(payload): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email: payload.email,
      },
    });

    let userResponse;

    if (!user) {
      userResponse = await this.post("user", {
        body: {
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
        },
      });
    } else {
      userResponse = await this.put("user", {
        body: {
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
        },
      });
    }

    const hacker = await this.get("hacker", {
      params: {
        email: payload.email,
      },
    });

    let hackerResponse;
    if (!hacker) {
      hackerResponse = await this.post("hacker", {
        body: {
          email: payload.email,

          website: payload.website,
          github: payload.github,
          linkedin: payload.linkedin,
          softwareExperience: payload.softwareExperience,
          ethereumExperience: payload.ethereumExperience,
          motivation: payload.motivation,
          builtBefore: payload.builtBefore,
          buildHackathon: payload.buildHackathon,
          conduct: payload.conduct,
        },
      });

      return hackerResponse;
    } else {
      hackerResponse = await this.put("hacker", {
        body: {
          email: payload.email,

          website: payload.website,
          github: payload.github,
          linkedin: payload.linkedin,
          softwareExperience: payload.softwareExperience,
          ethereumExperience: payload.ethereumExperience,
          motivation: payload.motivation,
          builtBefore: payload.builtBefore,
          buildHackathon: payload.buildHackathon,
          conduct: payload.conduct,
        },
      });
    }

    return {
      ...userResponse,
      ...hackerResponse,
    };
  }

  async findMentor(payload): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email: payload.email,
      },
    });

    const mentor = await this.get("mentor", {
      params: {
        email: user.email,
      },
    });

    return {
      ...user,
      ...mentor,
    };
  }

  async createOrUpdateMentor(payload): Promise<{}> {
    const user = await this.get("user", {
      params: {
        email: payload.email,
      },
    });

    let userResponse;
    if (!user) {
      userResponse = await this.post("user", {
        body: {
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
        },
      });
    } else {
      userResponse = await this.put("user", {
        body: {
          email: payload.email,
          name: payload.name,
          lastName: payload.lastName,
        },
      });
    }

    const mentor = await this.get("mentor", {
      params: {
        email: payload.email,
      },
    });

    let mentorResponse;
    if (!mentor) {
      mentorResponse = await this.post("mentor", {
        body: {
          email: payload.email,

          website: payload.website,
          github: payload.github,
          linkedin: payload.linkedin,
          telegram: payload.telegram,
          twitter: payload.twitter,
          softwareExperience: payload.softwareExperience,
          ethereumExperience: payload.ethereumExperience,
          ethereumMentored: payload.ethereumMentored,
          whyMentor: payload.whyMentor,
          acceptRules: payload.acceptRules,
        },
      });

      return mentorResponse;
    } else {
      mentorResponse = await this.put("mentor", {
        body: {
          email: payload.email,

          website: payload.website,
          github: payload.github,
          linkedin: payload.linkedin,
          telegram: payload.telegram,
          twitter: payload.twitter,
          softwareExperience: payload.softwareExperience,
          ethereumExperience: payload.ethereumExperience,
          ethereumMentored: payload.ethereumMentored,
          whyMentor: payload.whyMentor,
          acceptRules: payload.acceptRules,
        },
      });
    }

    return {
      ...userResponse,
      ...mentorResponse,
    };
  }
}
