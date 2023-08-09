var documenterSearchIndex = {"docs":
[{"location":"references/#References","page":"References","title":"References","text":"","category":"section"},{"location":"references/","page":"References","title":"References","text":"","category":"page"},{"location":"apis/#APIs","page":"APIs","title":"APIs","text":"","category":"section"},{"location":"apis/#Transforms","page":"APIs","title":"Transforms","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"AbstractTransform","category":"page"},{"location":"apis/#NeuralOperators.AbstractTransform","page":"APIs","title":"NeuralOperators.AbstractTransform","text":"AbstractTransform\n\nInterface\n\nBase.ndims(<:AbstractTransform): N dims of modes\ntransform(<:AbstractTransform, 𝐱::AbstractArray): Apply the transform to 𝐱\ntruncate_modes(<:AbstractTransform, 𝐱_transformed::AbstractArray): Truncate modes that contribute to the noise\ninverse(<:AbstractTransform, 𝐱_transformed::AbstractArray): Apply the inverse transform to 𝐱_transformed\n\n\n\n\n\n","category":"type"},{"location":"apis/#Layers","page":"APIs","title":"Layers","text":"","category":"section"},{"location":"apis/#Operator-convolutional-layer","page":"APIs","title":"Operator convolutional layer","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"F(s) = mathcalF  v(x)  \nF(s) = g(F(s)) \nv(x) = mathcalF^-1  F(s) ","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"where v(x) and v(x) denotes input and output function, mathcalF  cdot , mathcalF^-1  cdot  are the transform and the inverse transform, respectively. Function g is a linear transform for lowering spectrum modes.","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"OperatorConv","category":"page"},{"location":"apis/#NeuralOperators.OperatorConv","page":"APIs","title":"NeuralOperators.OperatorConv","text":"OperatorConv(ch, modes, transform;\n             init=glorot_uniform, permuted=false, T=ComplexF32)\n\nArguments\n\nch: A Pair of input and output channel size ch_in=>ch_out, e.g. 64=>64.\nmodes: The modes to be preserved. A tuple of length d, where d is the dimension of data.\nTransform: The trafo to operate the transformation.\n\nKeyword Arguments\n\ninit: Initial function to initialize parameters.\npermuted: Whether the dim is permuted. If permuted=true, the layer accepts data in the order of (ch, x_1, ... , x_d , batch). Otherwise the order is (x_1, ... , x_d, ch, batch).\nT: Datatype of parameters.\n\nExample\n\njulia> OperatorConv(2 => 5, (16,), FourierTransform)\nOperatorConv(2 => 5, (16,), FourierTransform, permuted=false)\n\njulia> OperatorConv(2 => 5, (16,), FourierTransform, permuted = true)\nOperatorConv(2 => 5, (16,), FourierTransform, permuted=true)\n\n\n\n\n\n","category":"type"},{"location":"apis/","page":"APIs","title":"APIs","text":"Reference: Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar (2021)","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"","category":"page"},{"location":"apis/#Operator-kernel-layer","page":"APIs","title":"Operator kernel layer","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"v_t+1(x) = sigma(W v_t(x) + mathcalK  v_t(x)  )","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"where v_t(x) is the input function for the t'th layer and mathcalK  cdot  denotes spectral convolutional layer. Activation function sigma can be an arbitrary non-linear function.","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"OperatorKernel","category":"page"},{"location":"apis/#NeuralOperators.OperatorKernel","page":"APIs","title":"NeuralOperators.OperatorKernel","text":"OperatorKernel(ch, modes, σ=identity; permuted=false)\n\nArguments\n\nch: A Pair of input and output channel size for spectral convolution in_ch=>out_ch, e.g. 64=>64.\nmodes: The modes to be preserved for spectral convolution. A tuple of length d, where d is the dimension of data.\nσ: Activation function.\n\nKeyword Arguments\n\npermuted: Whether the dim is permuted. If permuted=true, the layer accepts data in the order of (ch, x_1, ... , x_d , batch), otherwise the order is (x_1, ... , x_d, ch, batch).\n\nExample\n\njulia> OperatorKernel(2 => 5, (16,), FourierTransform)\nOperatorKernel(2 => 5, (16,), FourierTransform, σ=identity, permuted=false)\n\njulia> using Flux\n\njulia> OperatorKernel(2 => 5, (16,), FourierTransform, relu)\nOperatorKernel(2 => 5, (16,), FourierTransform, σ=relu, permuted=false)\n\njulia> OperatorKernel(2 => 5, (16,), FourierTransform, relu, permuted = true)\nOperatorKernel(2 => 5, (16,), FourierTransform, σ=relu, permuted=true)\n\n\n\n\n\n","category":"type"},{"location":"apis/","page":"APIs","title":"APIs","text":"Reference: Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar (2021)","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"","category":"page"},{"location":"apis/#Graph-kernel-layer","page":"APIs","title":"Graph kernel layer","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"v_t+1(x_i) = sigma(W v_t(x_i) + frac1mathcalN(x_i) sum_x_j in mathcalN(x_i) kappa  v_t(x_i) v_t(x_j)  )","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"where v_t(x_i) is the input function for t-th layer, x_i is the node feature for i-th node and mathcalN(x_i) represents the neighbors for x_i. Activation function sigma can be an arbitrary non-linear function.","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"GraphKernel","category":"page"},{"location":"apis/#NeuralOperators.GraphKernel","page":"APIs","title":"NeuralOperators.GraphKernel","text":"GraphKernel(κ, ch, σ=identity)\n\nGraph kernel layer.\n\nArguments\n\nκ: A neural network layer for approximation, e.g. a Dense layer or a MLP.\nch: Channel size for linear transform, e.g. 32.\nσ: Activation function.\n\nKeyword Arguments\n\ninit: Initial function to initialize parameters.\n\n\n\n\n\n","category":"type"},{"location":"apis/","page":"APIs","title":"APIs","text":"Reference: Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar (2020)","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"","category":"page"},{"location":"apis/#Models","page":"APIs","title":"Models","text":"","category":"section"},{"location":"apis/#Fourier-neural-operator","page":"APIs","title":"Fourier neural operator","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"FourierNeuralOperator","category":"page"},{"location":"apis/#NeuralOperators.FourierNeuralOperator","page":"APIs","title":"NeuralOperators.FourierNeuralOperator","text":"FourierNeuralOperator(;\n                      ch = (2, 64, 64, 64, 64, 64, 128, 1),\n                      modes = (16, ),\n                      σ = gelu)\n\nFourier neural operator is a operator learning model that uses Fourier kernel to perform spectral convolutions. It is a promising way for surrogate methods, and can be regarded as a physics operator.\n\nThe model is comprised of a Dense layer to lift (d + 1)-dimensional vector field to n-dimensional vector field, and an integral kernel operator which consists of four Fourier kernels, and two Dense layers to project data back to the scalar field of interest space.\n\nThe role of each channel size described as follows:\n\n[1] input channel number\n ↓ Dense\n[2] lifted channel number\n ↓ OperatorKernel\n[3] mapped channel number\n ↓ OperatorKernel\n[4] mapped channel number\n ↓ OperatorKernel\n[5] mapped channel number\n ↓ OperatorKernel\n[6] mapped channel number\n ↓ Dense\n[7] projected channel number\n ↓ Dense\n[8] projected channel number\n\nKeyword Arguments\n\nch: A Tuple or Vector of the 8 channel size.\nmodes: The modes to be preserved. A tuple of length d, where d is the dimension of data.\nσ: Activation function for all layers in the model.\n\nExample\n\njulia> using NNlib\n\njulia> FourierNeuralOperator(;\n                             ch = (2, 64, 64, 64, 64, 64, 128, 1),\n                             modes = (16,),\n                             σ = gelu)\nChain(\n  Dense(2 => 64),                       # 192 parameters\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (16,), FourierTransform, permuted=false),  # 65_536 parameters\n    NNlib.gelu,\n  ),\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (16,), FourierTransform, permuted=false),  # 65_536 parameters\n    NNlib.gelu,\n  ),\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (16,), FourierTransform, permuted=false),  # 65_536 parameters\n    NNlib.gelu,\n  ),\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (16,), FourierTransform, permuted=false),  # 65_536 parameters\n    identity,\n  ),\n  Dense(64 => 128, gelu),               # 8_320 parameters\n  Dense(128 => 1),                      # 129 parameters\n)                   # Total: 18 arrays, 287_425 parameters, 2.098 MiB.\n\n\n\n\n\n","category":"type"},{"location":"apis/","page":"APIs","title":"APIs","text":"Reference: Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar (2021)","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"","category":"page"},{"location":"apis/#Markov-neural-operator","page":"APIs","title":"Markov neural operator","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"MarkovNeuralOperator","category":"page"},{"location":"apis/#NeuralOperators.MarkovNeuralOperator","page":"APIs","title":"NeuralOperators.MarkovNeuralOperator","text":"MarkovNeuralOperator(;\n                     ch = (1, 64, 64, 64, 64, 64, 1),\n                     modes = (24, 24),\n                     σ = gelu)\n\nMarkov neural operator learns a neural operator with Fourier operators. With only one time step information of learning, it can predict the following few steps with low loss by linking the operators into a Markov chain.\n\nThe model is comprised of a Dense layer to lift d-dimensional vector field to n-dimensional vector field, and an integral kernel operator which consists of four Fourier kernels, and a Dense layers to project data back to the scalar field of interest space.\n\nThe role of each channel size described as follows:\n\n[1] input channel number\n ↓ Dense\n[2] lifted channel number\n ↓ OperatorKernel\n[3] mapped channel number\n ↓ OperatorKernel\n[4] mapped channel number\n ↓ OperatorKernel\n[5] mapped channel number\n ↓ OperatorKernel\n[6] mapped channel number\n ↓ Dense\n[7] projected channel number\n\nKeyword Arguments\n\nch: A Tuple or Vector of the 7 channel size.\nmodes: The modes to be preserved. A tuple of length d, where d is the dimension of data.\nσ: Activation function for all layers in the model.\n\nExample\n\njulia> using NNlib\n\njulia> MarkovNeuralOperator(;\n                            ch = (1, 64, 64, 64, 64, 64, 1),\n                            modes = (24, 24),\n                            σ = gelu)\nChain(\n  Dense(1 => 64),                       # 128 parameters\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (24, 24), FourierTransform, permuted=false),  # 2_359_296 parameters\n    NNlib.gelu,\n  ),\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (24, 24), FourierTransform, permuted=false),  # 2_359_296 parameters\n    NNlib.gelu,\n  ),\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (24, 24), FourierTransform, permuted=false),  # 2_359_296 parameters\n    NNlib.gelu,\n  ),\n  OperatorKernel(\n    Dense(64 => 64),                    # 4_160 parameters\n    OperatorConv(64 => 64, (24, 24), FourierTransform, permuted=false),  # 2_359_296 parameters\n    NNlib.gelu,\n  ),\n  Dense(64 => 1),                       # 65 parameters\n)                   # Total: 16 arrays, 9_454_017 parameters, 72.066 MiB.\n\n\n\n\n\n","category":"type"},{"location":"apis/","page":"APIs","title":"APIs","text":"Reference: Zongyi Li, Nikola Kovachki, Kamyar Azizzadenesheli, Burigede Liu, Kaushik Bhattacharya, Andrew Stuart, Anima Anandkumar (2021)","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"","category":"page"},{"location":"apis/#DeepONet","page":"APIs","title":"DeepONet","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"DeepONet\nNeuralOperators.construct_subnet","category":"page"},{"location":"apis/#NeuralOperators.DeepONet","page":"APIs","title":"NeuralOperators.DeepONet","text":"DeepONet(architecture_branch::Tuple, architecture_trunk::Tuple, act_branch = identity, act_trunk = identity; init_branch = Flux.glorot_uniform, init_trunk = Flux.glorot_uniform, bias_branch=true, bias_trunk=true) DeepONet(branch_net::Flux.Chain, trunk_net::Flux.Chain)\n\nCreate an (unstacked) DeepONet architecture as proposed by Lu et al. arXiv:1910.03193\n\nThe model works as follows:\n\nx --- branch --\n               |\n                -⊠--u-\n               |\ny --- trunk ---\n\nWhere x represents the input function, discretely evaluated at its respective sensors. So, the input is of shape [m] for one instance or [m x b] for a training set. y are the probing locations for the operator to be trained. It has shape [N x n] for N different variables in the PDE (i.e. spatial and temporal coordinates) with each n distinct evaluation points. u is the solution of the queried instance of the PDE, given by the specific choice of parameters.\n\nBoth inputs `x` and `y` are multiplied together via dot product Σᵢ bᵢⱼ tᵢₖ.\n\nYou can set up this architecture in two ways:\n\n1. By Specifying the architecture and all its parameters as given above. This always creates\n `Dense` layers for the branch and trunk net and corresponds to the DeepONet proposed by Lu et al.\n\n2. By passing two architectures in the form of two Chain structs directly. Do this if you want more\nflexibility and e.g. use an RNN or CNN instead of simple `Dense` layers.\n\nStrictly speaking, DeepONet does not imply either of the branch or trunk net to be a simple\n DNN. Usually this is the case, which is why it's treated as the default case here.\n\nExample\n\nConsider a transient 1D advection problem ∂ₜu + u ⋅ ∇u = 0, with an IC u(x,0) = g(x). We are given several (b = 200) instances of the IC, discretized at 50 points each, and want to query the solution for 100 different locations and times [0;1].\n\nThat makes the branch input of shape [50 x 200] and the trunk input of shape [2 x 100]. So, the input for the branch net is 50 and 100 for the trunk net.\n\nUsage\n\njulia> model = DeepONet((32, 64, 72), (24, 64, 72))\nDeepONet with\nbranch net: (Chain(Dense(32, 64), Dense(64, 72)))\nTrunk net: (Chain(Dense(24, 64), Dense(64, 72)))\n\njulia> model = DeepONet((32, 64, 72), (24, 64, 72), σ, tanh; init_branch = Flux.glorot_normal,\n                        bias_trunk = false)\nDeepONet with\nbranch net: (Chain(Dense(32, 64, σ), Dense(64, 72, σ)))\nTrunk net: (Chain(Dense(24, 64, tanh; bias=false), Dense(64, 72, tanh; bias=false)))\n\njulia> branch = Chain(Dense(2, 128), Dense(128, 64), Dense(64, 72))\nChain(\n  Dense(2, 128),                        # 384 parameters\n  Dense(128, 64),                       # 8_256 parameters\n  Dense(64, 72),                        # 4_680 parameters\n)                   # Total: 6 arrays, 13_320 parameters, 52.406 KiB.\n\njulia> trunk = Chain(Dense(1, 24), Dense(24, 72))\nChain(\n  Dense(1, 24),                         # 48 parameters\n  Dense(24, 72),                        # 1_800 parameters\n)                   # Total: 4 arrays, 1_848 parameters, 7.469 KiB.\n\njulia> model = DeepONet(branch, trunk)\nDeepONet with\nbranch net: (Chain(Dense(2, 128), Dense(128, 64), Dense(64, 72)))\nTrunk net: (Chain(Dense(1, 24), Dense(24, 72)))\n\n\n\n\n\n","category":"type"},{"location":"apis/#NeuralOperators.construct_subnet","page":"APIs","title":"NeuralOperators.construct_subnet","text":"Construct a Chain of Dense layers from a given tuple of integers.\n\nInput: A tuple (m,n,o,p) of integer type numbers that each describe the width of the i'th Dense layer to Construct\n\nOutput: A Flux Chain with length of the input tuple and individual width given by the tuple elements\n\nExample\n\njulia> model = NeuralOperators.construct_subnet((2, 128, 64, 32, 1))\nChain(\n  Dense(2, 128),                        # 384 parameters\n  Dense(128, 64),                       # 8_256 parameters\n  Dense(64, 32),                        # 2_080 parameters\n  Dense(32, 1),                         # 33 parameters\n)                   # Total: 8 arrays, 10_753 parameters, 42.504 KiB.\n\njulia> model([2, 1])\n1-element Vector{Float32}:\n -0.7630446\n\n\n\n\n\n","category":"function"},{"location":"apis/","page":"APIs","title":"APIs","text":"","category":"page"},{"location":"apis/#NOMAD","page":"APIs","title":"NOMAD","text":"","category":"section"},{"location":"apis/","page":"APIs","title":"APIs","text":"Nonlinear manifold decoders for operator learning","category":"page"},{"location":"apis/","page":"APIs","title":"APIs","text":"NOMAD","category":"page"},{"location":"apis/#NeuralOperators.NOMAD","page":"APIs","title":"NeuralOperators.NOMAD","text":"NOMAD(architecture_approximator::Tuple, architecture_decoder::Tuple,\n      act_approximator = identity, act_decoder=true;\n      init_approximator = Flux.glorot_uniform,\n      init_decoder = Flux.glorot_uniform,\n      bias_approximator=true, bias_decoder=true)\nNOMAD(approximator_net::Flux.Chain, decoder_net::Flux.Chain)\n\nCreate a Nonlinear Manifold Decoders for Operator Learning (NOMAD) as proposed by Lu et al. arXiv:2206.03551\n\nThe decoder is defined as follows:\n\ntilde D (β y) = f(β y)\n\nUsage\n\njulia> model = NOMAD((16, 32, 16), (24, 32))\nNOMAD with\nApproximator net: (Chain(Dense(16 => 32), Dense(32 => 16)))\nDecoder net: (Chain(Dense(24 => 32, true)))\n\njulia> model = NeuralOperators.NOMAD((32, 64, 32), (64, 72), σ, tanh;\n                                     init_approximator = Flux.glorot_normal, bias_decoder = false)\nNOMAD with\nApproximator net: (Chain(Dense(32 => 64, σ), Dense(64 => 32, σ)))\nDecoder net: (Chain(Dense(64 => 72, tanh; bias=false)))\n\njulia> approximator = Chain(Dense(2, 128), Dense(128, 64))\nChain(\n  Dense(2 => 128),                      # 384 parameters\n  Dense(128 => 64),                     # 8_256 parameters\n)                   # Total: 4 arrays, 8_640 parameters, 34.000 KiB.\n\njulia> decoder = Chain(Dense(72, 24), Dense(24, 12))\nChain(\n  Dense(72 => 24),                      # 1_752 parameters\n  Dense(24 => 12),                      # 300 parameters\n)                   # Total: 4 arrays, 2_052 parameters, 8.266 KiB.\n\njulia> model = NOMAD(approximator, decoder)\nNOMAD with\nApproximator net: (Chain(Dense(2 => 128), Dense(128 => 64)))\nDecoder net: (Chain(Dense(72 => 24), Dense(24 => 12)))\n\n\n\n\n\n","category":"type"},{"location":"introduction/#Introduction","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"introduction/","page":"Introduction","title":"Introduction","text":"Neural operator is a novel deep learning architecture. It learns a operator, which is a mapping between infinite-dimensional function spaces. It can be used to resolve partial differential equations (PDE). Instead of solving by time-consuming finite element method, a PDE problem can be resolved by training a neural network to learn an operator mapping from infinite-dimensional space (u t) to infinite-dimensional space f(u t). Neural operator learns a continuous function between two continuous function spaces. The kernel can be trained on different geometry, including regular Euclidean space or a graph topology.","category":"page"},{"location":"introduction/#[Fourier-Neural-Operators](https://github.com/SciML/NeuralOperators.jl/blob/main/src/FNO/FNO.jl)","page":"Introduction","title":"Fourier Neural Operators","text":"","category":"section"},{"location":"introduction/","page":"Introduction","title":"Introduction","text":"Fourier neural operator (FNO) learns a neural operator with Dirichlet kernel to form a Fourier transformation. It performs Fourier transformation across infinite-dimensional function spaces and learns better than neural operator.","category":"page"},{"location":"introduction/#[Markov-Neural-Operators](https://github.com/SciML/NeuralOperators.jl/blob/main/src/FNO/FNO.jl)","page":"Introduction","title":"Markov Neural Operators","text":"","category":"section"},{"location":"introduction/","page":"Introduction","title":"Introduction","text":"Markov neural operator (MNO) learns a neural operator with Fourier operators. With only one time step information of learning, it can predict the following few steps with low loss by linking the operators into a Markov chain.","category":"page"},{"location":"introduction/#[Deep-Operator-Network](https://github.com/SciML/NeuralOperators.jl/blob/main/src/DeepONet/DeepONet.jl)","page":"Introduction","title":"Deep Operator Network","text":"","category":"section"},{"location":"introduction/","page":"Introduction","title":"Introduction","text":"Deep operator network (DeepONet) learns a neural operator with the help of two sub-neural network structures, described as the branch and the trunk network. The branch network is fed the initial condition data, whereas the trunk is fed with the locations where the target (output) is evaluated from the corresponding initial conditions. It is important that the output size of the branch and trunk subnets is the same so that a dot product can be performed between them.","category":"page"},{"location":"introduction/#[Nonlinear-Manifold-Decoders-for-Operator-Learning](https://github.com/SciML/NeuralOperators.jl/blob/main/src/NOMAD/NOMAD.jl)","page":"Introduction","title":"Nonlinear Manifold Decoders for Operator Learning","text":"","category":"section"},{"location":"introduction/","page":"Introduction","title":"Introduction","text":"Nonlinear Manifold Decoders for Operator Learning (NOMAD) learns a neural operator with a nonlinear decoder parameterized by a deep neural network which jointly takes the output of the approximator and the locations as parameters. The approximator network is fed with the initial condition data. The output-of-approximator and the locations are then passed to a decoder neural network to get the target (output). It is important that the input size of the decoder subnet is the sum of size of the output-of-approximator and number of locations.","category":"page"},{"location":"","page":"Home","title":"Home","text":"CurrentModule = NeuralOperators","category":"page"},{"location":"#NeuralOperators","page":"Home","title":"NeuralOperators","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"(Image: ) (Image: )\nGround Truth Inferred","category":"page"},{"location":"","page":"Home","title":"Home","text":"The demonstration shown above is the Navier-Stokes equation learned by the MarkovNeuralOperator with only one time step information. The example can be found in example/FlowOverCircle.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install NeuralOperators.jl, use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"NeuralOperators\")","category":"page"},{"location":"#Usage","page":"Home","title":"Usage","text":"","category":"section"},{"location":"#Fourier-Neural-Operator","page":"Home","title":"Fourier Neural Operator","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"model = Chain(\n    # lift (d + 1)-dimensional vector field to n-dimensional vector field\n    # here, d == 1 and n == 64\n    Dense(2, 64),\n    # map each hidden representation to the next by integral kernel operator\n    OperatorKernel(64=>64, (16, ), FourierTransform, gelu),\n    OperatorKernel(64=>64, (16, ), FourierTransform, gelu),\n    OperatorKernel(64=>64, (16, ), FourierTransform, gelu),\n    OperatorKernel(64=>64, (16, ), FourierTransform),\n    # project back to the scalar field of interest space\n    Dense(64, 128, gelu),\n    Dense(128, 1),\n)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Or one can just call:","category":"page"},{"location":"","page":"Home","title":"Home","text":"model = FourierNeuralOperator(ch = (2, 64, 64, 64, 64, 64, 128, 1),\n                              modes = (16,),\n                              σ = gelu)","category":"page"},{"location":"","page":"Home","title":"Home","text":"And then train as a Flux model.","category":"page"},{"location":"","page":"Home","title":"Home","text":"loss(𝐱, 𝐲) = l₂loss(model(𝐱), 𝐲)\nopt = Flux.Optimiser(WeightDecay(1.0f-4), Flux.Adam(1.0f-3))\nFlux.@epochs 50 Flux.train!(loss, params(model), data, opt)","category":"page"},{"location":"#DeepONet","page":"Home","title":"DeepONet","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"# tuple of Ints for branch net architecture and then for trunk net,\n# followed by activations for branch and trunk respectively\nmodel = DeepONet((32, 64, 72), (24, 64, 72), σ, tanh)","category":"page"},{"location":"","page":"Home","title":"Home","text":"Or specify branch and trunk as separate Chain from Flux and pass to DeepONet","category":"page"},{"location":"","page":"Home","title":"Home","text":"branch = Chain(Dense(32, 64, σ), Dense(64, 72, σ))\ntrunk = Chain(Dense(24, 64, tanh), Dense(64, 72, tanh))\nmodel = DeepONet(branch, trunk)","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can again specify loss, optimization, and training parameters just as you would for a simple neural network with Flux.","category":"page"},{"location":"","page":"Home","title":"Home","text":"loss(xtrain, ytrain, sensor) = Flux.Losses.mse(model(xtrain, sensor), ytrain)\nevalcb() = @show(loss(xval, yval, grid))\n\nlearning_rate = 0.001\nopt = Adam(learning_rate)\nparameters = params(model)\nFlux.@epochs 400 Flux.train!(loss, parameters, [(xtrain, ytrain, grid)], opt, cb = evalcb)","category":"page"},{"location":"","page":"Home","title":"Home","text":"A more complete example using DeepONet architecture to solve Burgers' equation can be found in the examples.","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"Home","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can also download the \n<a href=\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n       \"/assets/Manifest.toml\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"\">manifest</a> file and the\n<a href=\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n       \"/assets/Project.toml\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"\">project</a> file.","category":"page"}]
}
