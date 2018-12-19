const users = [{
  id: 1,
  name: 'Kieron',
  schoolId: 101
},
{
  id: 2,
  name: 'Jessica',
  schoolId: 999
}];


const grades = [{
  id: 1,
  schoolId: 101,
  grade: 86
},
{
  id: 2,
  schoolId: 999,
  grade: 100
},
{
  id: 1,
  schoolId: 101,
  grade: 80
}];

const getUser = (id) => {
  return new Promise((resolve, reject) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user ${id}.`)
    }
  });
};

const getGrades = (schooldId) => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter((grade) => grade.schoolId === schooldId));
  });
};

// This function reveals issue with chaining promises
// since to calc average in second promise we do not have access
// to user since it was created in the previous promise callback
// so create a user variable with scope across getStatus
const getStatus = (userId) => {
  let user;
  return getUser(userId).then((tempUser) => {
    user = tempUser;
    console.log(user.name, user.schoolId);
    return getGrades(user.schoolId);
  }).then((grades) => {
    let average = 0; // let is the ES6 equivalent of var!

    if (grades.length > 0) {
      // array operations
      // reduce function generates a sum of the grades
      // as follows iter1: sum a + b, iter2: sum + c and so on
      average = grades.map((grade) => grade.grade).reduce((a, b) =>  a + b)/ grades.length; // calculates the average
    }
    return `${user.name} has a ${average}% in the class.`;
  });
};

// async functions always return Promises and resolve them
//So async function is equivalent of:
// () => {
//   returnnew Promise((resolve, reject) => {
//       resolve('Mike');
//   })
// };
// const getStatusAlt = async (userId) => {
//   throw new Error('An error has occured'); // this is the equivalent of rejecting in async funcs
//   return 'Mike';
// };
//
// getStatusAlt().then((name) => {
//   console.log(name);
// }).catch((e) => {
//   console.log(e);
// });

const getStatusAlt = async (userId) => {
  // await will block until the promise returns
  // await can only be used inside an async function
  const user = await getUser(userId); // without await a promise would be returned
  const grades = await getGrades(user.schoolId);
  let average = 0; // let is the ES6 equivalent of var!

  if (grades.length > 0) {
    // array operations
    // reduce function generates a sum of the grades
    // as follows iter1: sum a + b, iter2: sum + c and so on
    average = grades.map((grade) => grade.grade).reduce((a, b) =>  a + b)/ grades.length; // calculates the average
  }
  return `${user.name} has a ${average}% in the class.`;
};

// Note thet the getUser/getGrades function dont use asyn/await because
// they are not asynchronous functions so that don't need them

getStatusAlt(2).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e);
});

// getUser(2).then((user) => {
//   console.log(user);
// }).catch((e) => {
//   console.log(e);
// });
//
// getGrades(101).then((grades) => {
//   console.log(grades);
// }).catch((e) => {
//   console.log(e);
// });

// getStatus(1).then((status) => {
//   console.log(status);
// }).catch((e) => {
//   console.log(e);
// });
